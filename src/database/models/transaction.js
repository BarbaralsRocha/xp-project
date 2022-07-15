'use strict';
const TransactionSchema = (sequelize, DataTypes) => {
  const TransactionTable = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: DataTypes.NUMBER,
    activeId: DataTypes.NUMBER,
    type: DataTypes.STRING,
    quantity: DataTypes.NUMBER
  });

  return TransactionTable;
}

module.exports = TransactionSchema;
