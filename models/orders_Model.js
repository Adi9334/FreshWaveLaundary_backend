
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Orders", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT(20)
    },  
    service_id: {
      type: DataTypes.BIGINT(20)
    },
    order_item_quantity: {
      type: DataTypes.INTEGER(11)
    },
    order_mrp:{
      type: DataTypes.INTEGER(11)
    },

    order_item_price: {
      type: DataTypes.INTEGER(11)
    },
    order_tax: {
      type: DataTypes.INTEGER(11)
    },
    order_discount: {
      type: DataTypes.INTEGER(11)
    },
    order_total_afterdis: {
      type: DataTypes.INTEGER(11)
    },
    order_promocode: {
      type: DataTypes.STRING(512)
    },
    order_delivery_charges: {
      type: DataTypes.INTEGER(11)
    },
    order_handling_charges: {
      type: DataTypes.INTEGER(11)
    },
    order_total_price: {
      type: DataTypes.INTEGER(11)
    },
    order_address_id: {
      type: DataTypes.BIGINT(20)
    },
    order_payment_mode: {
      type: DataTypes.STRING(128)
    },
    order_status: {
      type: DataTypes.STRING(128)
    },
    order_delivered_at: {
      type: DataTypes.DATE
    },
    order_delivery_type: {
      type: DataTypes.STRING(128)
    },
    order_delivery_slot: {
      type: DataTypes.STRING(128)
    },
    created_by: {
      type: DataTypes.STRING(128)
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    modified_by: {
      type: DataTypes.STRING(128)
    },
    modified_at: {
      type: DataTypes.DATE
    },
    is_active: {
      type: DataTypes.TINYINT(1)
    }
  }, {
    tableName: "Orders",
    freezeTableName: true,
    timestamps: false
  });
  return Order;
};