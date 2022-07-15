'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        unique:true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        unique:true,
        allowNull: false,
        type: Sequelize.STRING
      },
      balance: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      account: {
        allowNull: false,
        unique:true,
        type: Sequelize.INTEGER
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Users');
  }
};