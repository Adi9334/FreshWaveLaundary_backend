const { sequelize, Sequelize } = require('../config/dbconfig');

const { Op } = require('sequelize');
//const { Users } = require("../models/userModel.js");
//const AppOTPSmsTemplate = require('../models/AppOTPSmsTemplate_Model.js');
//const AppOTP = require("../models/AppOTP_Model.js");

const logger = require("../Utils/winston-logger.js");
const { decrypt } = require("../Utils/AES.Util.js");
const { aesEncrypt } = require("../Utils/DBAES.Util.js");
const { now, opt_expire_at } = require("../controllers/datetimecontroller.js");
require('dotenv').config();
//const db = require('../index.js');
//const Users = db.Users;
const Users = require('../models/userModel.js')(sequelize, Sequelize.DataTypes);

//const AppOTPSmsTemplate = db.AppOTPSmsTemplate;
const AppOTPSmsTemplate = require('../models/AppOTPSmsTemplate_Model.js')(sequelize, Sequelize.DataTypes);
const AppOTP = require('../models/AppOTP_Model.js')(sequelize, Sequelize.DataTypes);



const sendOTPService = async (user_mobile_no) => {
    const currentDate = Date.now();
    let transaction;
  
    try {
      // Start a transaction
      transaction = await sequelize.transaction();
  
      const otp_value = Math.floor(1000 + Math.random() * 9000);
  
      const user = await Users.findOne({
        where: {
          phone_number: user_mobile_no
        },
        transaction
      });
  
      let template_record_id;
      if (user) {
        template_record_id = process.env.login_template_record_id;
        console.log("template login id " + template_record_id);
      } else {
        template_record_id = process.env.register_template_record_id;
        console.log("template register id " + template_record_id);
      }
  
      const template = await AppOTPSmsTemplate.findOne({
        where: {
          template_id: template_record_id,
        },
        attributes: ['template_message'],
        transaction
      });

  
      const templateMessage = template ? template.template_message : null;
      const modifiedMessage = templateMessage.replace('{#var#}', otp_value).replace('{#app_signature#}',process.env.app_signature);

      const newData = await AppOTP.create({
        user_mobile_no: user_mobile_no,
        otp_value: otp_value,
        expire_at: opt_expire_at(),
        usage_status: 'unused',
        otp_count: 1,
        created_by: 'admin',
        created_at: now(),
        is_active: 1,
        template_record_id: template_record_id,
        otp_attempts: 0,
      }, { transaction });
  
      await transaction.commit();
      return { refrence_id: newData.id, modifiedMessage:modifiedMessage };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error in sendingOTP:", error);
      throw error;
    }
  };
      

  const verifyOTPService = async (refrence_id, otp_value, phone_number) => {
    let transaction;
    let user_record_id;
    let isNewUser;
  
    try {
      transaction = await sequelize.transaction();
      const dbStartTime = Date.now();
  
      const verifyUser = await AppOTP.findOne({
        where: {
          id: refrence_id,
          otp_value: otp_value,
          expire_at: { [Op.gt]: now() },
          usage_status: 'unused',
          is_active: 1
        },
        transaction,
      });
      if (verifyUser) {
        const user = await Users.findOne({
          where: {
            phone_number: phone_number
          },
          attributes: ['id'],
          transaction
        });
  
        if (user !== null) {
          user_record_id = user.id;
          isNewUser = false;
        } else {
          const newUser = await Users.create({
            phone_number: phone_number,
            created_at: now(),
            created_by: 'admin',
            is_active: 1,
          }, { transaction });
  
          user_record_id = newUser.id;
          isNewUser = true;
        }
  
        await AppOTP.update({
          usage_status: 'used',
          is_active: 0
        }, {
          where: {
            id: refrence_id
          },
          transaction
        });
  
        await transaction.commit();
        const dbEndTime = Date.now();
        logger.info(`Db Query | verifyOTP  |  DbQueryTime: ${dbEndTime - dbStartTime}`);
  
        return { user_record_id: user_record_id, isNewUser: isNewUser };
      } else {
        return null; // Indicate OTP verification failure
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error in verifying OTP:", error);
      throw error;
    }
  };
  

  const resendOTPService = async (refrence_id, phone_number) => {
    let transaction;
    let new_reference_id;
  
    try {
      transaction = await sequelize.transaction();
      const dbStartTime = Date.now();
  
      const getOTPDetails = await AppOTP.findOne({
        where: {
          user_mobile_no: phone_number,
          id: refrence_id,
          usage_status: 'unused',
          is_active: 1
        },
        attributes: ['otp_value', 'otp_count', 'expire_at', 'id'],
        // include: [{
        //   model: AppOTP,
        //   attributes: ['template_message'],
        //   required: true
        // }],
        transaction
      });
  
      if (getOTPDetails) {
        const otp_count = getOTPDetails.otp_count;
        const expire_at = getOTPDetails.expire_at;
        const otp_value = getOTPDetails.otp_value;
        const template_record_id = getOTPDetails.id;
  
        if (expire_at > now() && otp_count <= 3) {
          new_reference_id = refrence_id;
          await AppOTP.update({
              otp_count: otp_count + 1,
            }, {
              where: {
                id: refrence_id
              },
              transaction
            }
          );
        } else if (otp_count > 3) {
          const new_otp_value = Math.floor(1000 + Math.random() * 9000);
          const newOTPdetails = await AppOTP.create({
              user_mobile_no: phone_number,
              otp_value: new_otp_value,
              expire_at: opt_expire_at(),
              usage_status: 'unused',
              otp_count: 1,
              created_by: 'admin',
              created_at: now(),
              is_active: 1,
              template_record_id: template_record_id,
              otp_attempts: 0
            }, { transaction }
          );
  
          new_reference_id = newOTPdetails.id;
        } else {
          return;
        }
      } else {
        return console.log("error");
      }
  
      await transaction.commit();
      const dbEndTime = Date.now();
      logger.info(`Db Query | verifyOTP  |  DbQueryTime: ${dbEndTime - dbStartTime}`);
  
      return { refrence_id: new_reference_id };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error while resending OTP:", error);
      throw error;
    }
  };
  
module.exports = { sendOTPService,verifyOTPService,resendOTPService};
