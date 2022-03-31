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
  let chaiHttpResponse: Response;

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
      sinon.stub(bcryptjs, "compare").resolves(true);
    });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('testa se a rota /login responde o id do usuário', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login');
      expect(chaiHttpResponse.body.user.id).to.equal(responseMock.id);
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
      const chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal("\"email\" is required");
    });

    it('testa se retorna erro caso a senha seja inválida', async () => {
      const payload = {
        email: 'admin@admin.com',
      }
      const chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal("\"password\" is required");
    })
  });
});