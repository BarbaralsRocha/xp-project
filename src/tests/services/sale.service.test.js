/* eslint-disable no-undef */
// const { expect } = require('chai');
// const sinon = require('sinon');
// const { Transaction, Active, User } = require('../../database/models');
// const saleService = require('../../service/sale.service.js');

// // eslint-disable-next-line no-undef

// describe('Quando realizar uma venda', () => {
//   const expectedResult = {
//             dataValues: { 
//               id: null, 
//               userId: 1, 
//               assetsId: 1, 
//               type: 'sale', 
//               quantity: 100 
//             }
//       }

//     const expectedActive = {
//       dataValues: {
//         id: 1,
//         name: 'LOCAWEB',
//         assets: 'LWSA3',
//         price: '5.90',
//         quantity: 400
//       }
//     }
//     describe('quando executar a função sale', () => {

//       beforeEach(() => {
//         sinon.stub(Transaction, 'create').resolves(expectedResult.dataValues);
//       });
    
//       afterEach(() => {
//         Transaction.create.restore();
//       });


//     describe('quando executar a função findByPk', () => {


//       beforeEach(() => {
//         sinon.stub(Active, 'findByPk').resolves(expectedActive.dataValues);
//       });
    
//       afterEach(() => {
//         Active.findByPk.restore();
//       });

//       it('deve retornar um erro se tentar comprar com uma conta diferente ao do usuario logado', async () => {
//         const response = await saleService.sale(1, 1, 'sale', 100, 125456);
//         console.log('response', response)
//       });
// });
// });
// });

/* eslint-disable no-undef */
const { expect } = require('chai');
const sinon = require('sinon');
const { Transaction, Active, User } = require('../../database/models');
const saleService = require('../../service/sale.service.js');

// eslint-disable-next-line no-undef

describe('Quando realizar uma venda', () => {
    const expectedResult = {
        dataValues: { 
          id: null, 
          userId: 1, 
          assetsId: 1, 
          type: 'sale', 
          quantity: 100 
        }
  }

  const asset = {
    dataValues: {
      id: 1,
      name: 'LOCAWEB',
      assets: 'LWSA3',
      price: '5.90',
      quantity: 10000
    }
  }

  const user = {
    dataValues:  {
      id: 1,
      name: 'Barbara Rocha',
      password: '123456',
      cpf: '11122233344',
      email: 'barbaralsrocha@gmail.com',
      balance: 100000,
      account: 123456
    }
  }

  beforeEach(() => {
    sinon.stub(Transaction, 'create').resolves(expectedResult.dataValues);
  });

  afterEach(() => {
    Transaction.create.restore();
  });
    describe('quando executar a função sale', () => {

      beforeEach(() => {
        sinon.stub(Active, 'findByPk').resolves(asset.dataValues);
      });
    
      afterEach(() => {
        Active.findByPk.restore();
      });

      describe('quando executar a função sale', () => {

        beforeEach(() => {
          sinon.stub(User, 'findByPk').resolves(user.dataValues);
        });
      
        afterEach(() => {
          User.findByPk.restore();
        });
      it('deve retornar um erro se tentar vender com uma conta diferente ao do usuario logado', async () => {
        try {
          await saleService.sale(1, 1, 'sale', 100, 125456);
      } catch(e){
          expect(e).to.be.an('error');
      }
      });

      it('deve retornar um erro se tentar vender mais do que possui em carteira', async () => {
        try {
          await saleService.sale(1, 1, 'sale', 1000000, 123456);
      } catch(e){
          expect(e).to.be.an('error');
      }
      });


  });
});
});
