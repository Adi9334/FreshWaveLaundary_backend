
module.exports = (sequelize, DataTypes) => {
    const FQA = sequelize.define("faq_master", {
      faq_question: {
        type: DataTypes.STRING,
      },
      faq_answer: {
        type: DataTypes.TEXT,
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
      tableName:"faq_master",
      freezeTableName: true, 
      underscored: true ,
      timestamps: false 
    });
  
    return FQA;
};