'use strict';
const TransactionSchema = (sequelize, DataTypes) => {
  const TransactionTable = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: 'User',
          key: 'id'
        },
      },
    },
    assetsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: 'Active',
          key: 'id'
        },
      },
    },
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  },
    { timestamps: false }
  );

  TransactionTable.associate = (models) => {

    models.User.belongsToMany(models.Active, {
        through: TransactionTable,
        foreignKey: 'userId',
        otherKey: 'assetsId',
        as: 'assets'
    });

    models.Active.belongsToMany(models.User, {
        through: TransactionTable,
        foreignKey: 'assetsId',
        otherKey: 'userId',
        as: 'user'
    });

}
    // TransactionTable.associate = (models) => {
    //   TransactionTable.hasMany(models.User, { foreignKey: "userId", as: "user" });
    // }
    // TransactionTable.associate = (models) => {
    //   TransactionTable.hasMany(models.Active, { foreignKey: "activeId", as: "active" });
    // }

  return TransactionTable;
}

module.exports = TransactionSchema;
