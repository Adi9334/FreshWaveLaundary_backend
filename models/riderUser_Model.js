module.exports = (sequelize, DataTypes) => {
    const RiderUser = sequelize.define("RiderUser", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        modified_by: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        modified_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: "rider_users",
        freezeTableName: true,
        timestamps: false
    });

    return RiderUser;
};
