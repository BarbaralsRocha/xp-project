'use strict';
const TransactionSchema = (sequelize, DataTypes) => {
  const TransactionTable = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    activeId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  },
    { timestamps: false }
  );

  TransactionTable.associate = (models) => {

    models.User.belongsToMany(models.Active, {
        through: TransactionTable,
        foreignKey: 'userId',
        otherKey: 'activeId',
        as: 'actives'
    });

    models.Active.belongsToMany(models.User, {
        through: TransactionTable,
        foreignKey: "activeId",
        otherKey: "userId",
        as: 'users'
    });

}

  return TransactionTable;
}

module.exports = TransactionSchema;
