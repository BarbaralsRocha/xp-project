module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Actives',
      [{
        id: 1,
        name: 'LOCAWEB',
        assets: 'LWSA3',
        price: 5.90,
        quantity: 10000,
      },
      {
        id: 2,
        name: 'ALLIAR',
        assets: 'AALR3',
        price: 19.96,
        quantity: 500,
      },
      {
        id: 3,
        name: 'MONTEIRO ARANHA',
        assets: 'MOAR3',
        price: 453.89,
        quantity: 300,
      },
      {
        id: 4,
        name: 'OI',
        assets: 'OIBR3',
        price: 0.50,
        quantity: 10000,
      },
      {
        id: 5,
        name: 'SANTANENSE',
        assets: 'CTSA4',
        price: 0.74,
        quantity: 15000,
      },
      {
        id: 6,
        name: 'RECRUSUL',
        assets: 'RCSL4',
        price: 1.04,
        quantity: 9000,
      },
      {
        id: 7,
        name: 'EXCELSIOR ',
        assets:'BAUH4',
        price: 72.99,
        quantity: 3000,
      },
      {
        id: 8,
        name: 'TELEF BRASIL',
        assets: 'VIVT3',
        price:47.27,
        quantity:8000,
      },
      {
        id: 9,
        name: 'ELETROBRÁS ',
        assets: 'ELET3',
        price: 43.60,
        quantity:13000,
      },
      {
        id: 10,
        name: 'NEXPE',
        assets: 'NEXP3',
        price: 0.51,
        quantity: 13000,
      },
      ]);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Actives', null, {});
  },
};
