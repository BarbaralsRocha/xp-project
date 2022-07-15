'use strict';
const ActiveSchema = (sequelize, DataTypes) => {
  const ActiveTable = sequelize.define("Active", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    action: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  });
  
  return ActiveTable;
}

module.exports = ActiveSchema;
