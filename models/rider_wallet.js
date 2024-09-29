module.exports = (sequelize, DataTypes) => {
  const RiderWallet = sequelize.define("rider_wallet", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    rider_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    current_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.STRING(30),
    },
    modified_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, 
  {
    tableName: "rider_wallet",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  });

  return RiderWallet;
};
