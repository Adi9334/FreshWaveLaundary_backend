
module.exports = (sequelize, DataTypes) => {
    const DeletedUsers = sequelize.define("rider_Deletedusers", {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone_number: {
        type: DataTypes.STRING
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
      tableName:"rider_Deletedusers",
      freezeTableName: true, 
      underscored: true ,
      timestamps: false 
    });
  
    return DeletedUsers;
};