import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('A rota de login', () => {
  let res: Response;
  let req;

  const responseMock = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  
  describe('testa se passar um usuario válido', () => {
    before(async () => {
      sinon
       .stub(Users, "findOne")
        .resolves(responseMock as Users);
      sinon.stub(bcryptjs, "compareSync").returns(true);
    });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
      (bcryptjs.compareSync as sinon.SinonStub).restore();
    });

    it('Verifica se o usuário é válido', async () => {
      req = { email: "admin@admin.com", password: "secret_admin" };
      res = await chai.request(app).post('/login').send(req);

      const { user, token } = res.body;

      expect(user.id).to.be.equal(1);
    });
   
  });

  describe('testa se passar algum valor inválido', () => {
    before(async () => {
      sinon
       .stub(Users, "findOne")
        .resolves(responseMock as Users);
      sinon.stub(bcryptjs, "compare").resolves(true);
    });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('testa se retorna erro caso email seja inválido', async () => {
      const payload = {
        password: '1234567'
      }
      const res = await chai.request(app).post('/login').send(payload);
      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.equal("All fields must be filled");
    });

    it('testa se retorna erro caso a senha seja inválida', async () => {
      const payload = {
        email: 'admin@admin.com',
      }
      const res = await chai.request(app).post('/login').send(payload);
      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.equal("All fields must be filled");
    })
  });
});