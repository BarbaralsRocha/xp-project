module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Transactions',
      [{
        userId: 1,
        assetsId: 4,
        type: 'buy',
        quantity: 3000,
      },
      {
        userId: 4,
        assetsId: 2,
        type: 'buy',
        quantity: 2000,
      },
      {
        userId: 5,
        assetsId: 3,
        type: 'buy',
        quantity: 100,
      },
      {
        userId: 2,
        assetsId: 8,
        type: 'sale',
        quantity: 700,
      },
      {
        userId: 3,
        assetsId: 1,
        type: 'sale',
        quantity: 6000,
      },
      {
        userId: 1,
        assetsId: 5,
        type: 'buy',
        quantity: 700,
      },
      {
        userId: 3,
        assetsId: 6,
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
