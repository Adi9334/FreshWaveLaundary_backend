
module.exports = (sequelize,DataTypes) =>{
    const PickupScheduleMaster = sequelize.define("Pickup_Schedule_Master", {
        id:{
            type:DataTypes.BIGINT,
            allowNull:false,
        },
        weekday : {
            type: DataTypes.varchar,
            allowNull: false
        },
        start_time: {
            type: DataTypes.time,
            allowNull: false,
        },
        end_time : {
            type: DataTypes.time,
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
            tableName:"Pickup_Schedule_Master",
            freezeTableName: true, 
            timestamps: false 
        });
    return PickupScheduleMaster;
}