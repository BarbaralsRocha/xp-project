/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');
const { expect } = require("chai");
require('dotenv').config();

// ROTA PARA COMPRA DE INVESTIMENTOS
describe("Será validado se é possível fazer uma requisição para compras de investimentos com sucesso", () => {
  beforeAll(() => {
    shell.exec('npm run restore',
      { silent: process.env.DEBUG === "false" });
  });

    it("e retornar um json com as chaves codCliente, codAtivo e qtdeAtivos", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        })
      .post(`http://localhost:3000/investimentos/comprar`,
      {
        codAtivo: 3,
        qtdeAtivos: 1,
        conta: 123456
        })
      .expect('status', 201)
      .then((response) => {
        const { json: { codCliente, codAtivo, qtdeAtivos } } = response;
        expect(codCliente).to.equal(1);
        expect(codAtivo).to.equal(3);
        expect(qtdeAtivos).to.equal(1);
      });
    });
  });

  describe("Será validado se não é possível fazer uma requisição de compras de investimentos", () => {

      it("sem um token", async () => {
        await frisby
        .setup({
        request: {
            headers: {
            Authorization: '',
            'Content-Type': 'application/json',
            },
        },
        })
        .post(`http://localhost:3000/investimentos/comprar`, {
            codAtivo: 3,
            qtdeAtivos: 1,
            conta: 123466
            })
        .expect('status', 401)
        .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Token não encontrado');
        });
    });

    it('com o token inválido', async () => {
      await frisby
        .setup({
          request: {
            headers: {
              Authorization: 'mo3183bfbahaf',
              'Content-Type': 'application/json',
            },
          },
        })
        .post(`http://localhost:3000/investimentos/comprar`, {
          codAtivo: 3,
          qtdeAtivos: 1,
          conta: 123466
          })
        .expect('status', 401)
        .then((responseSales) => {
          const { json } = responseSales;
          expect(json.message).to.equal('Token inválido ou expirado');
        });
});

    it("pq a conta do cliente não é a mesma da pessoa logada", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        }).post(`http://localhost:3000/investimentos/comprar`,
        {
          codAtivo: 3,
          qtdeAtivos: 1,
          conta: 123466
          })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Conta inválida');
      });
    });

    it("pq a quantidade de ativos excedeu o limite", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        }).post(`http://localhost:3000/investimentos/comprar`,
        {
          codAtivo: 3,
          qtdeAtivos: 10000,
          conta: 123456
          })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Qtde de ativos excedido');
      });
    });

  });

  // ROTA PARA VENDA DE INVESTIMENTOS

  describe("Será validado se é possível fazer uma requisição para investimento de venda com sucesso", () => {
    it("e retornar um json com as chaves codCliente, codAtivo e qtdeAtivos", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        })
      .post(`http://localhost:3000/investimentos/vender`,
      {
        codAtivo: 5,
        qtdeAtivos: 100,
        conta: 123456
        })
      .expect('status', 201)
      .then((response) => {
        const { json: { codCliente, codAtivo, qtdeAtivos } } = response;
        expect(codCliente).to.equal(1);
        expect(codAtivo).to.equal(5);
        expect(qtdeAtivos).to.equal(100);
      });
    });
  });

  describe("Será validado se não é possível fazer uma requisição de venda de investimentos", () => {

      it("sem um token", async () => {
        await frisby
        .setup({
        request: {
            headers: {
            Authorization: '',
            'Content-Type': 'application/json',
            },
        },
        })
        .post(`http://localhost:3000/investimentos/vender`, {
            codAtivo: 3,
            qtdeAtivos: 1,
            conta: 123466
            })
        .expect('status', 401)
        .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Token não encontrado');
        });
    });
    it('com o token inválido', async () => {
          await frisby
            .setup({
              request: {
                headers: {
                  Authorization: 'mo3183bfbahaf',
                  'Content-Type': 'application/json',
                },
              },
            })
            .post(`http://localhost:3000/investimentos/vender`, {
              codAtivo: 3,
              qtdeAtivos: 1,
              conta: 123456
              })
            .expect('status', 401)
            .then((responseSales) => {
              const { json } = responseSales;
              expect(json.message).to.equal('Token inválido ou expirado');
            });
    });
    
    it("pq a conta do cliente não é a mesma da pessoa logada", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        }).post(`http://localhost:3000/investimentos/vender`,
        {
          codAtivo: 5,
          qtdeAtivos: 100,
          conta: 123466
          })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Conta inválida');
      });
    });

    it("pq a quantidade de ativos excedeu o limite", async () => {
        let token;
        await frisby
        .post(`http://localhost:3000/login`,
        {
            email: 'barbaralsrocha@gmail.com',
            password: '123456',
        })
        .expect('status', 200)
        .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
        });

        await frisby
        .setup({
        request: {
            headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            },
        },
        }).post(`http://localhost:3000/investimentos/vender`,
        {
          codAtivo: 5,
          qtdeAtivos: 10000,
          conta: 123456
          })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Qtde de ativos excedido');
      });
    });

  });