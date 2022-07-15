'use strict';
const UsersSchema = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    email: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    account: DataTypes.INTEGER
  });

  UsersTable.associate = (models) => {
    UsersTable.hasMany(models.Active, { foreignKey: "userId", as: "actives" });
  }

  return UsersTable;
}

module.exports = UsersSchema;
