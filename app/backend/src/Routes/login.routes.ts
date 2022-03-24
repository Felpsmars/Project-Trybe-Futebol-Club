import * as express from 'express';
import loginController from '../Controller/login';

const login = express.Router();

login.post('/', loginController.login);

export default login;
