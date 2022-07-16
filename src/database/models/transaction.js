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
    });

    models.Active.belongsToMany(models.User, {
        through: TransactionTable,
        foreignKey: 'activeId',
    });

}
    // TransactionTable.associate = (models) => {
    //   TransactionTable.hasMany(models.User, { foreignKey: "userId", as: "users" });
    // }
    // TransactionTable.associate = (models) => {
    //   TransactionTable.hasMany(models.Active, { foreignKey: "activeId", as: "actives" });
    // }

  return TransactionTable;
}

module.exports = TransactionSchema;
