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
  });

  UsersTable.associate = (models) => {
    UsersTable.hasMany(models.Active, { foreignKey: "userId", as: "actives" });
  }

  return UsersTable;
}

module.exports = UsersSchema;
