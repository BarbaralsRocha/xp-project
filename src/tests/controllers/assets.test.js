/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');
const { expect } = require("chai");
require('dotenv').config();

// ROTA PARA GET ASSETS BY ID
describe("Será validado se é possível fazer uma requisição GET para ativos por id", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });
    it("e retornar um json com as chaves codAtivo, qtdeAtivos e valor", async () => {
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
      .get(`http://localhost:3000/assets/ativos/1`)
      .expect('status', 200)
      .then((response) => {
        const { json: { codAtivo, qtdeAtivos, valor } } = response;
        expect(codAtivo).to.equal('1');
        expect(qtdeAtivos).to.equal(10000);
        expect(valor).to.equal('5.90');
      });
    });
  });

  describe("Será validado se não é possível fazer uma requisição GET para ativos por id", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });

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
      .get(`http://localhost:3000/assets/ativos/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Token not found');
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
          .get(`http://localhost:3000/assets/ativos/1`)
          .expect('status', 401)
          .then((responseSales) => {
            const { json } = responseSales;
            expect(json.message).to.equal('Expired or invalid token');
          });
  });

    it("com um id inválido", async () => {
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
      .get(`http://localhost:3000/assets/ativos/15`)
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Ativo não encontrado');
      });
    });
  });

/* =======================================================*/

// ROTA PARA GET ClIENTS ASSETS BY ID
  describe("Será validado se é possível fazer uma requisição GET para ativos de clientes por id", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });
    it("e retornar um json com as chaves codCliente, codAtivo, qtdeAtivos e valor", async () => {
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
      .get(`http://localhost:3000/clientes/ativos/1`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const userAsset1 = json[0];
        const userAsset2 = json[1]
        expect(userAsset1.codCliente).to.equal(1);
        expect(userAsset1.codAtivo).to.equal(4);
        expect(userAsset1.qtdeAtivos).to.equal(10000);
        expect(userAsset1.valor).to.equal('0.50');
        expect(userAsset2.codCliente).to.equal(1);
        expect(userAsset2.codAtivo).to.equal(5);
        expect(userAsset2.qtdeAtivos).to.equal(15000);
        expect(userAsset2.valor).to.equal('0.74');
      });
    });
  });

  describe("Será validado se não é possível fazer uma requisição GET para ativos de clientes por id", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });

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
      .get(`http://localhost:3000/clientes/ativos/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Token not found');
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
            .get(`http://localhost:3000/clientes/ativos/1`)
            .expect('status', 401)
            .then((responseSales) => {
            const { json } = responseSales;
            expect(json.message).to.equal('Expired or invalid token');
            });
            });
    it("com um id inválido", async () => {
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
      .get(`http://localhost:3000/clientes/ativos/15`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Usuário não encontrado');
      });
    });
  });