/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');
const { expect } = require("chai");
require('dotenv').config();


describe("Será validado se é possível logar um usuário com sucesso", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });
    it("e retornar um token", async () => {
        await frisby
      .post(`http://localhost:3000/login`,
        {
          email: 'barbaralsrocha@gmail.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { json: { token } } = response;
        expect(typeof token).to.equal('string');
      });
    });
  });

  describe("Será validado se não é possível logar um usuário", () => {
    beforeEach(() => {
        shell.exec('npm run restore');
    });

    it("pq o usuário não possui conta ou o campo esta inválido", async () => {
        await frisby
      .post(`http://localhost:3000/login`,
        {
          email: 'zezinho@gmail.com',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).to.equal('Invalid fields');
      });
    });
  });