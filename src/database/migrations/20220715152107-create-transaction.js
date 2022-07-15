'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      activeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Actives',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};