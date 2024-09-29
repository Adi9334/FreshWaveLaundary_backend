
module.exports = (sequelize, DataTypes) => {
    const AppBanner = sequelize.define("AppBanner", {
        app_banner_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        app_banner_imageURL:{
            type: DataTypes.STRING,
            allowNull : true
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        modified_by: {
            type: DataTypes.STRING
        },
        modified_at: {
            type: DataTypes.DATE
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "AppBanner",
        freezeTableName: true,
        timestamps: false
    });

    return AppBanner;
};
