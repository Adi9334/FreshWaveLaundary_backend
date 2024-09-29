
module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", {
        coupon_discount_type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        coupon_discount:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        coupon_order_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coupon_minium_order:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        coupon_code:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        coupon_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      coupon_imageURL: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'coupon_imageURL'
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
      },
    }, 
    {
      tableName:"Coupon",
      freezeTableName: true, 
      underscored: true ,
      timestamps: false 
    });
  
    return Coupon;
};