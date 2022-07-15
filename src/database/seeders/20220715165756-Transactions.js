module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Transactions',
      [{
        userId: 1,
        activeId: 4,
        type: 'buy',
        quantity: 3000,
      },
      {
        userId: 4,
        activeId: 2,
        type: 'buy',
        quantity: 2000,
      },
      {
        userId: 5,
        activeId: 3,
        type: 'buy',
        quantity: 100,
      },
      {
        userId: 2,
        activeId: 8,
        type: 'sale',
        quantity: 700,
      },
      {
        userId: 3,
        activeId: 1,
        type: 'sale',
        quantity: 6000,
      },
      {
        userId: 1,
        activeId: 5,
        type: 'buy',
        quantity: 700,
      },
      {
        userId: 3,
        activeId: 6,
        type: 'sale',
        quantity: 600,
      },
      ]);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
