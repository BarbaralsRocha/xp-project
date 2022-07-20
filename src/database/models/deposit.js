'use strict';
const depositSchema = (sequelize, DataTypes) => {
  const depositTable = sequelize.define("Deposit", {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  },
    { timestamps: false }
  );
  
  return depositTable;
}

module.exports = depositSchema;
