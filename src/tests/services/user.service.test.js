/* eslint-disable no-undef */
const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../database/models');
const UserService = require('../../service/user.service.js');

// eslint-disable-next-line no-undef

describe('Quando não encontrar um usuário', () => {
    const expectedResult = {
        dataValues: {
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123456',
            cpf: '19122233344',
            balance: 100000,
            account: 193456
        }
  }
  
  beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(null);
    });
  
    afterEach(() => {
      User.findOne.restore();
    });
  
    describe('quando executar a função findOne', () => {
      it('deve retornar nula', async () => {
          const { email, password, cpf, account } = expectedResult.dataValues
          const response = await UserService.findUser(email, password, cpf, account);
        expect(response).to.be.null
      });

    });
  });

describe('Encontrar um usuário existente', () => {
  const expectedResult = {
      dataValues: {
        name: 'bita',
        email: 'barbaralsrocha@gmail.com',
        password: '123456',
        cpf: '11122233344',
        balance: 100000,
        account: 123456
    }
}

beforeEach(() => {
    sinon.stub(User, 'findOne').resolves(expectedResult.dataValues);
  });

  afterEach(() => {
    User.findOne.restore();
  });

  describe('quando executar a função findOne', () => {
    it('deve retornar um objeto', async () => {
        const { email, password, cpf, account } = expectedResult.dataValues
        const response = await UserService.findUser(email, password, cpf, account);
      expect(response).to.be.an('object');
    });

    it('o objeto deve retornar um objeto com as chaves name, email, password, cpf, balance, account', async () => {
        const { email, password, cpf, account } = expectedResult.dataValues
        const response = await UserService.findUser(email, password, cpf, account);
        expect(response).to.deep.equal(expectedResult.dataValues);
        expect(response).to.have.property('name');
        expect(response).to.have.property('email');
        expect(response).to.have.property('password');
        expect(response).to.have.property('cpf');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('account');
    });
  });
});


describe('Buscar todos os usuários', () => {
    const expectedResult = {
        dataValues: [
            {
                "id": 1,
                "name": "Barbara Rocha",
                "cpf": "11122233344",
                "email": "barbaralsrocha@gmail.com",
                "balance": 100000,
                "account": 123456
            },
            {
                "id": 2,
                "name": "Fernanda Rocha",
                "cpf": "22211133344",
                "email": "fernanda@teste.com",
                "balance": 20000,
                "account": 213456
            },
            {
                "id": 3,
                "name": "Vinicius Rocha",
                "cpf": "33344411122",
                "email": "vinicius@teste.com",
                "balance": 30000,
                "account": 321456
            },
            {
                "id": 4,
                "name": "Rodrigo Marques",
                "cpf": "44433322211",
                "email": "rodrigo@teste.com",
                "balance": 18000,
                "account": 214356
            },
            {
                "id": 5,
                "name": "Carlos Rocha",
                "cpf": "12354612365",
                "email": "carlos@teste.com",
                "balance": 40000,
                "account": 132456
            }
        ]
  }
  
  beforeEach(() => {
      sinon.stub(User, 'findAll').resolves(expectedResult.dataValues);
    });
  
    afterEach(() => {
      User.findAll.restore();
    });
  
    describe('quando executar a função findAll', () => {
      it('deve retornar um array', async () => {
          const response = await UserService.getUsers();
        expect(response).to.be.an('array');
      });
  
      it('o objeto deve retornar um array com objetos e em cada objeto deve ter as chaves name, email, cpf, balance, account', async () => {
          const response = await UserService.getUsers();
          expect(response).to.deep.equal(expectedResult.dataValues);
          expect(response[0]).to.have.property('name');
          expect(response[0]).to.have.property('email');
          expect(response[0].password).to.be.undefined;
          expect(response[0]).to.have.property('cpf');
          expect(response[0]).to.have.property('balance');
          expect(response[0]).to.have.property('account');
      });
    });
  });

describe('Quando for atualizar a carteira', () => {

  beforeEach(() => {
      sinon.stub(User, 'update').resolves(1);
    });
  
    afterEach(() => {
      User.update.restore();
    });
  
    describe('quando executar a função update', () => {
      it('deve retornar um numero de linhas afetadas', async () => {
          const response = await UserService.updateWalletUser(900,1000,1,'buy');
        expect(response).to.be.an('number');
      });
    });
  });

describe('Quando for criar um novo usuário', () => {
const expectedResult = {
    dataValues: {
        name: 'test2',
        email: 'test2@gmail.com',
        password: '123456',
        cpf: '11122893344',
        balance: 100000,
        account: 129956
    }
}
beforeEach(() => {
    sinon.stub(User, 'create').resolves(expectedResult.dataValues);
    });

    afterEach(() => {
    User.create.restore();
    });

    describe('quando executar a função findOne', () => {

    beforeEach(() => {
        sinon.stub(User, 'findOne').resolves(null);
        });
    
        afterEach(() => {
        User.findOne.restore();
        });
        
    it('deve retornar um objeto', async () => {
        const { name, email, password, cpf, balance, account } = expectedResult.dataValues
        const response = await UserService.createUser({name, email, password, cpf, balance, account});
        expect(response).to.be.an('object');
    });

    it('o objeto deve retornar um objeto com as chaves name, email, password, cpf, balance, account', async () => {
        const { name, email, password, cpf, balance, account } = expectedResult.dataValues
        const response = await UserService.createUser({name, email, password, cpf, balance, account});
        expect(response).to.deep.equal(expectedResult.dataValues);
        expect(response).to.have.property('name');
        expect(response).to.have.property('email');
        expect(response).to.have.property('password');
        expect(response).to.have.property('cpf');
        expect(response).to.have.property('balance');
        expect(response).to.have.property('account');
    });
    });
});

describe('Quando o usuário ja possuir uma conta', () => {
const expectedResult = {
    dataValues: {
        name: 'test2',
        email: 'test2@gmail.com',
        password: '123456',
        cpf: '11122893344',
        balance: 100000,
        account: 129956
    }
    }

    beforeEach(() => {
    sinon.stub(User, 'create').resolves(null);
    });

    afterEach(() => {
    User.create.restore();
    });

    describe('quando executar a função findOne', () => {

    beforeEach(() => {
        sinon.stub(User, 'findOne').resolves(expectedResult.dataValues);
        });
    
        afterEach(() => {
        User.findOne.restore();
        });
        
    it('deve retornar um erro', async () => {
        const { name, email, password, cpf, balance, account } = expectedResult.dataValues
        try {
            await UserService.createUser({name, email, password, cpf, balance, account});
        } catch(e){
            expect(e).to.be.an('error');
        }
    });

    });
});


// describe.only('Quando fazer um requisição para verificar o saldo do cliente', () => {
//     const expectedResult = {
//         dataValues: {
//             name: 'Barbara Rocha',
//             email: 'barbaralsrocha@gmail.com',
//             password: '123456',
//             cpf: '11122233344',
//             balance: 100000,
//             account: 123456
//         }
//     }
//     beforeEach(() => {
//         sinon.stub(User, 'findByPk').resolves(expectedResult.dataValues);
//         });
    
//         afterEach(() => {
//         User.findByPk.restore();
//         });
    
//         describe('vai retornar o saldo do cliente', () => {
            
//         it('um numero ', async () => {
//             const { balance } = User.findByPk(1)
//             const response = await UserService.getAmount(1);
//             expect(response).to.be(balance);
//         });
    
        // it('o objeto deve retornar um objeto com as chaves name, email, password, cpf, balance, account', async () => {
        //     const { name, email, password, cpf, balance, account } = expectedResult.dataValues
        //     const response = await UserService.createUser({name, email, password, cpf, balance, account});
        //     expect(response).to.deep.equal(expectedResult.dataValues);
        //     expect(response).to.have.property('name');
        //     expect(response).to.have.property('email');
        //     expect(response).to.have.property('password');
        //     expect(response).to.have.property('cpf');
        //     expect(response).to.have.property('balance');
        //     expect(response).to.have.property('account');
        // });
    //     });
    // });
    