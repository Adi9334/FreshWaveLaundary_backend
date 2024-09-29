
module.exports = (sequelize, DataTypes) => {
const AppOTP = sequelize.define('app_otp_details', {
   id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_mobile_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    otp_value:{
        type: DataTypes.STRING(1024),
        allowNull:false,
    },
    expire_at:{
        type:DataTypes.DATE,
        allowNull:false
    },
    usage_status:{
        type: DataTypes.STRING(200),
        allowNull:false,
    },
    otp_count:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    template_record_id:{
        type: DataTypes.BIGINT,
        allowNull:true,
    },
    otp_attempts:{
        type: DataTypes.BIGINT,
        allowNull:true,
    },
    created_by: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    modified_by: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    modified_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
    tableName: 'app_otp_details', // Specify the table name if different from the model name
});
return AppOTP;
}

