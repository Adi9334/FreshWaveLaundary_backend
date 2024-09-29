
module.exports = (sequelize,DataTypes) =>{
    const ServiceItem = sequelize.define("Service_Items_master", {
        service_item_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_item_imageURL : {
            type: DataTypes.STRING,
            allowNull: false,
            name: 'service_item_imageURL'
        },
        service_item_price:{
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
            tableName:"Service_Items_master",
            freezeTableName: true, 
            timestamps: false 
        });
    return ServiceItem;
}