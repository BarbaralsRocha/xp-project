/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');
const { expect } = require("chai");
require('dotenv').config();

// ROTA PARA DEPOSITO
describe("Será validado se é possível fazer um depósito com sucesso", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });
    it("e retornar um json com as chaves codCliente e valor", async () => {
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
      .post(`http://localhost:3000/conta/deposito`,
      {
        codCliente: 1,
        valor: 1000
        })
      .expect('status', 201)
      .then((response) => {
        const { json: { codCliente, valor } } = response;
        expect(codCliente).to.equal(1);
        expect(valor).to.equal(1000);
      });
    });
  });

  describe("Será validado se não é possível fazer um deposito", () => {
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
      .get(`http://localhost:3000/conta/deposito`)
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
            .get(`http://localhost:3000/conta/deposito`)
            .expect('status', 401)
            .then((responseSales) => {
            const { json } = responseSales;
            expect(json.message).to.equal('Expired or invalid token');
            });
    });
    it("pq não é possivel encontrar o codCliente", async () => {
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
        }).post(`http://localhost:3000/conta/deposito`,
        {
        codCliente: 10,
        valor: 1000,
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Usuário nao encontrado');
      });
    });

  });

  // ROTA PARA SAQUE

describe("Será validado se é possível fazer um saque com sucesso", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });
it("e retornar um json com as chaves codCliente e valor", async () => {
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
  .post(`http://localhost:3000/conta/deposito`,
  {
    codCliente: 1,
    valor: 1000
    })
  .expect('status', 201)
  .then((response) => {
    const { json: { codCliente, valor } } = response;
    expect(codCliente).to.equal(1);
    expect(valor).to.equal(1000);
  });
});
});

describe("Será validado se não é possível fazer um saque", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });

it("pq não é possivel encontrar o codCliente", async () => {
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
    }).post(`http://localhost:3000/conta/saque`,
    {
    codCliente: 10,
    valor: 1000,
    })
    .expect('status', 409)
    .then((response) => {
    const { json } = response;
    expect(json.message).to.equal('Usuário nao encontrado');
    });    
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
  .get(`http://localhost:3000/conta/saque`)
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
        .get(`http://localhost:3000/conta/saque`)
        .expect('status', 401)
        .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).to.equal('Expired or invalid token');
        });
});
    it("pq o cliente não possui saldo suficiente", async () => {
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
        }).post(`http://localhost:3000/conta/saque`,
        {
        codCliente: 1,
        valor: 1000000,
        })
        .expect('status', 422)
        .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Saldo insuficiente');
        });
    });

});
