module.exports = (sequelize, DataTypes) => {
    const RiderWalletTransactions = sequelize.define("rider_wallet_transactions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'RiderWallet', // This refers to the RiderWallet model
          key: 'id',
        },
      },
      transaction_type: {
        type: DataTypes.ENUM('deposit', 'withdrawal'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders', // Assuming you have an 'orders' model
          key: 'id',
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, 
    {
      tableName: "rider_wallet_transactions",
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    });
  
    return RiderWalletTransactions;
  };