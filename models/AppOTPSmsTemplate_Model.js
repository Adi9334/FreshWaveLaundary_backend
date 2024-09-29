
module.exports = (sequelize, DataTypes) => {
const AppOTPSmsTemplate = sequelize.define('app_sms_template_master', {
   id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    template_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    template_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    template_message:{
        type: DataTypes.STRING(256),
        allowNull:false,
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
    tableName: 'app_sms_template_master', // Specify the table name if different from the model name
});
return AppOTPSmsTemplate;
}
