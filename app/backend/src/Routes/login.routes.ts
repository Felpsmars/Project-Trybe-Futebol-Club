import * as express from 'express';
import loginController from '../Controller/login';
/* import validationJwt from '../middlewares/jwtAuth'; */
/* import validationPassword from '../middlewares/email'; */
/* import validationEmail from '../middlewares/password'; */

const login = express.Router();

login.post(
  '/',

  loginController.login,
);

login.get(
  '/validate',

  loginController.verifyToken,
);

export default login;
