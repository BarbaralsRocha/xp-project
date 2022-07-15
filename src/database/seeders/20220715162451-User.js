module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        name: 'Barbara Rocha',
        password: '123456',
        cpf: '11122233344',
        email: 'barbaralsrocha@gmail.com',
        balance: 100000,
        account: 123456,
      },
      {
        id: 2,
        name: 'Fernanda Rocha',
        password: '123456',
        cpf: '22211133344',
        email: 'fernanda@teste.com',
        balance: 20000,
        account: 213456,
      },
      {
        id: 3,
        name: 'Vinicius Rocha',
        password: '123456',
        cpf: '33344411122',
        email: 'vinicius@teste.com',
        balance: 30000,
        account: 321456,
      },
      {
        id: 4,
        name: 'Rodrigo Marques',
        password: '123456',
        cpf: '44433322211',
        email: 'rodrigo@teste.com',
        balance: 18000,
        account: 214356,
      },
      {
        id: 5,
        name: 'Carlos Rocha',
        password: '123456',
        cpf: '12354612365',
        email: 'carlos@teste.com',
        balance: 40000,
        account: 132456,
      },
      ]);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
