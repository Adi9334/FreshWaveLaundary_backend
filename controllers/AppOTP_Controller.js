const { sendOTPService, verifyOTPService, resendOTPService } = require("../services/AppOTP.js");
const logger = require("../Utils/winston-logger");
const { sendOTPmobile } = require("../controllers/otpcontroller.js");
const { log } = require("winston");

const sendOTP = async (req, res) => {
  const apiStartTime = Date.now();
  const { phone_number } = req.body;

  try {
      const newData = await sendOTPService(phone_number);
      
      if (newData) {
          const apiEndTime = Date.now();
          logger.info(`API | sendOTP | [${req.method}] | ${req.originalUrl} | Status: ${res.statusCode} | Total api time: ${apiEndTime - apiStartTime}`);

          console.log(newData);
          
          await sendOTPmobile(phone_number, newData.modifiedMessage)
          .then((response) => {
            console.log(response);
              return res.status(200).json({
                  refrence_id: newData.refrence_id,
              });
          })
          .catch((error) => {
              console.error('Error in Sending OTP', error);
              return res.status(500).json({ message: error.message });
          });
      } else {
          res.status(500).json({ message: "Error sending OTP" });
      }
  } catch (error) {
      console.error("Error in sending OTP:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
  

const verifyOTP = async (req, res) => {
  const apiStartTime = Date.now();
  const { refrence_id, otp_value, phone_number } = req.body;
  console.log(req.body);

  try {
    const newData = await verifyOTPService(refrence_id, otp_value, phone_number);
    console.log(newData);
    if (newData) {
      const apiEndTime = Date.now();
      logger.info(`API | verifyOTP | [${req.method}] | ${req.originalUrl} | Status: ${res.statusCode} | Total api time: ${apiEndTime - apiStartTime}`);
      res.status(200).json({ message: "OTP verified Successfully", data: newData });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resendOTP = async (req, res) => {
  const apiStartTime = Date.now();
  const { refrence_id, phone_number } = req.body;

  try {
    const newData = await resendOTPService(refrence_id, phone_number);
    if (newData) {
      const apiEndTime = Date.now();
      logger.info(`API | resendOTP | [${req.method}] | ${req.originalUrl} | Status: ${res.statusCode} | Total api time: ${apiEndTime - apiStartTime}`);
      res.status(200).json({ message: "OTP resent Successfully", data: newData });
    } else {
      res.status(400).json({ message: "Error resending OTP" });
    }
  } catch (error) {
    console.error("Error in resending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendOTP,verifyOTP,resendOTP};
