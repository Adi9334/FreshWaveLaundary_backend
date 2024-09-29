const { sequelize } = require('../config/dbconfig');
const { DataTypes } = require('sequelize');

//const Address = require('./Address')(sequelize, DataTypes);

module.exports = {
    sequelize,
    FQA,
    OrderItem,
    Order,
    Coupon,
    AppOTPSmsTemplate,
    AppOTP,
    Address,
    ServiceItem,
    Service,
    PickupScheduleMaster,
    Users,
    UserReview,
    Pincode,
    AppBanner,
    DeletedUsers,
    rider_wallet,
    rider_wallet_transactions
};
