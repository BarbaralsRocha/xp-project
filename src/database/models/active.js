'use strict';
const ActiveSchema = (sequelize, DataTypes) => {
  const ActiveTable = sequelize.define("Active", {
    name: DataTypes.STRING,
    assets: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER
  },
    { timestamps: false }
  );
  
  return ActiveTable;
}

module.exports = ActiveSchema;
