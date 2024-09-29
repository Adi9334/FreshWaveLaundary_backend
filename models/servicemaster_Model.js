
module.exports = (sequelize,DataTypes) =>{
    const Service = sequelize.define("Service_master", {
        service_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_description : {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_price : {
            type: DataTypes.INTEGER,
        },
        imageURL : {
            type: DataTypes.STRING, 
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
            tableName:"Service_master",
            freezeTableName: true, 
            timestamps: false 
        });
    return Service;
}