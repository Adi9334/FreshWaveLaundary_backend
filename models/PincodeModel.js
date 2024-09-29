module.exports = (sequelize, DataTypes) => {
    const Pincode = sequelize.define("Pincode", {
        pincode: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: "Pincode",
        freezeTableName: true,
        timestamps: false
    });

    return Pincode;
};
