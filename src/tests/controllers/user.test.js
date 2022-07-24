/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');
const { expect } = require("chai");
require('dotenv').config();


// Rota de GET user
describe("Para as rotas User", () => {
  beforeAll(() => {
    shell.exec('npm run restore',
      { silent: process.env.DEBUG === "false" });
  });

    describe("Será validado se é possível listar as pessoas usuárias com sucesso", () => {

    it("é chamado o status com o código 200 e retorna um response com json e a lista de usuários", async () => {
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
      }).get(`http://localhost:3000/user`)
        .expect('status', 200)
        .then((response) => {
          const { json } = response;
          const firstUser = json[0];
          expect(firstUser.name).to.equal('Barbara Rocha');
          expect(firstUser.email).to.equal('barbaralsrocha@gmail.com');
          expect(firstUser.cpf).to.equal('11122233344');
          expect(firstUser.password).to.equal(undefined);
          expect(firstUser.account).to.equal(123456);
      });
      });
    });
      describe("Será validado se não é possível listar as pessoas usuárias", () => {
    
        it("sem o token na requisição", async () => {
            await frisby
          .setup({
            request: {
              headers: {
                Authorization: '',
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`http://localhost:3000/user`)
          .expect('status', 401)
          .then((responseSales) => {
            const { json } = responseSales;
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
          .get(`http://localhost:3000/user`)
          .expect('status', 401)
          .then((responseSales) => {
            const { json } = responseSales;
            expect(json.message).to.equal('Token inválido ou expirado');
          });
          });
      });
    
      /* ======================================================*/
    
      // Rota POST user
      describe("Será validado se é possível cadastrar as pessoas usuárias com sucesso", () => {
    
        it("é chamado o status com o código 201 e retorna um response com token", async () => {
           await frisby
          .post(`http://localhost:3000/user`,
          {
            name: "xpinoc7",
            password: "senha123",
            cpf: "18962971945",
            email: "xpinc4ds2s6@gmail.com",
            balance: 100000,
            account: 143967
          })
          .expect('status', 201)
          .then((response) => {
            const { json: { token } } = response;
            expect(typeof token).to.equal('string');
          });
          });
      });
    
      describe("Será validado se não é possível cadastrar a pessoa usuária", () => {
        
          it("com o nome menor que 3 caracteres", async () => {
          await frisby
          .post(`http://localhost:3000/user`,
          {
            name: "Ba",
            password: "123456",
            cpf: "11122833344",
            email: "barbara@gmail.com",
            balance: 100000,
            account: 158756
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).to.equal('"name" length must be at least 3 characters long');
            });
        });
    
    
        it("com um email inválido", async () => {
            await frisby
            .post(`http://localhost:3000/user`,
            {
              name: "Barbara",
              password: "123456",
              cpf: "1112283364",
              email: "barbaraasdsagmail.com",
              balance: 100000,
              account: 158856
            })
            .expect('status', 400)
            .then((response) => {
              const { json } = response;
              expect(json.message).to.equal('"email" must be a valid email');
              });
          });
    
          it("com uma senha menor que 6 caracteres", async () => {
            await frisby
            .post(`http://localhost:3000/user`,
            {
              name: "Barbara",
              password: "12346",
              cpf: "1112283364",
              email: "barbaraasdsa@gmail.com",
              balance: 100000,
              account: 158856
            })
            .expect('status', 400)
            .then((response) => {
              const { json } = response;
              expect(json.message).to.equal('"password" length must be at least 6 characters long');
              });
          });
    
    
          it("já cadastrada", async () => {
            await frisby
           .post(`http://localhost:3000/user`,
           {
             name: "Barbara Rocha",
             password: "123456",
             cpf: "11122233344",
             email: "barbaralsrocha@gmail.com",
             balance: 100000,
             account: 123456
           })
           .expect('status', 409)
           .then((responseSales) => {
             const { json } = responseSales;
             expect(json.message).to.equal('Usuário já possui uma conta existente');
           });
           });
  });

});