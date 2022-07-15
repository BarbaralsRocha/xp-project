'use strict';
const UsersSchema = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    account: DataTypes.INTEGER
  },
    { timestamps: false }
  );

  return UsersTable;
}

module.exports = UsersSchema;
