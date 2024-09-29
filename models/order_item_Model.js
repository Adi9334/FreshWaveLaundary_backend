
module.exports = (sequelize,DataTypes) =>{
    const OrderItem = sequelize.define("Order_Item", {
        order_id:{
            type:DataTypes.BIGINT,
            allowNull:false,
        },
        order_item_id : {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        order_item_quantity : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_item_price:{
            type: DataTypes.FLOAT,
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
    }, 
        {
            tableName:"Order_Item",
            freezeTableName: true, 
            timestamps: false 
        });
    return OrderItem;
}