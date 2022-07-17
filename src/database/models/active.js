'use strict';
const ActiveSchema = (sequelize, DataTypes) => {
  const ActiveTable = sequelize.define("Active", {
    name: DataTypes.STRING,
    action: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  },
    { timestamps: false }
  );
  
  return ActiveTable;
}

module.exports = ActiveSchema;
