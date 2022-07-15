'use strict';
const UsersSchema = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.NUMBER,
    email: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    account: DataTypes.NUMBER
  });

  return UsersTable;
}

module.exports = UsersSchema;
