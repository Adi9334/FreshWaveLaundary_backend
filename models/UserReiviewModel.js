
module.exports = (sequelize, DataTypes) => {
    const UserReview = sequelize.define("user_review", {
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_phonenumber:{
            type: DataTypes.STRING,
            allowNull: true,
        },
      user_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_review: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName:"user_review",
      freezeTableName: true, 
      underscored: true ,
      timestamps: false 
    });
  
    return UserReview;
};