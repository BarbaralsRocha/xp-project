/* eslint-disable no-undef */
const { expect } = require('chai');
const sinon = require('sinon');
const { Active } = require('../../database/models');
const getClientsById = require('../../db/model/assetsByClient.model')
const activeService = require('../../service/active.service.js');

// eslint-disable-next-line no-undef

describe('Quando realizar uma venda', () => {

  beforeEach(() => {
    sinon.stub(Active, 'update').resolves(1);
  });

  afterEach(() => {
    Active.update.restore();
  });
    describe('quando executar a função updateQuantityAssets', () => {
      it('deve retornar a quantidade de linahs afetadas', async () => {
        const response = await activeService.updateQuantityAssets(100,1);
        expect(response).to.equal(1);
      });
    });
});


describe('Quando é requisitado encontrar um ativo pelo id', () => {
    const result = {
        id: 1,
        name: 'LOCAWEB',
        assets: 'LWSA3',
        price: '5.90',
        quantity: 10800
      }

    const assetById = {
        codAtivo: 1,
        qtdeAtivos: 10800,
        valor: 5.9
    }

    beforeEach(() => {
      sinon.stub(Active, 'findByPk').resolves(result);
    });
  
    afterEach(() => {
      Active.findByPk.restore();
    });
      describe('quando executar a função getAssetsById', () => {
        it('deve retornar um objeto com as chaves codAtivo, qtdeAivos, valor', async () => {
          const response = await activeService.getAssetsById(1);
          expect(response).to.deep.equal(assetById);
        });
      });
  });

  describe('Quando é requisitado encontrar um ativo pelo id', () => {
    beforeEach(() => {
      sinon.stub(Active, 'findByPk').resolves(null);
    });
  
    afterEach(() => {
      Active.findByPk.restore();
    });
      describe('e ele não encontra o id da requisição', () => {
        it('deve retornar um erro', async () => {
            try{
                await activeService.getAssetsById(20);
            } catch (e) {
                expect(e).to.be.an('error');            
            }
        });
      });
  });

  describe('Quando é requisitado encontrar os ativos do cliente pelo id do ativo', () => {
    const result = []

    beforeEach(() => {
      sinon.stub(getClientsById, 'assetsByClient').resolves(result);
    });
  
    afterEach(() => {
      getClientsById.assetsByClient.restore();
    });
      describe('e não encontra o id do usuario', () => {
        it('deve retornar um erro', async () => {
            try{
                await activeService.assetsClientsById(20);
            } catch (e) {
                expect(e).to.be.an('error');            
            }
        });
      });
  });