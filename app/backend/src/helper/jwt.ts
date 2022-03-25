import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import ILogin from '../interfaces/ILogin';

const readJwtSecret = async (): Promise<string> => {
  const jwtSecret: string = await fs.promises.readFile('jwt.evaluation.key', 'utf8');
  return jwtSecret;
};

const createToken = async (data: jwt.JwtPayload): Promise<string> => {
  const jwtSecret = await readJwtSecret();
  const token = jwt.sign(data, jwtSecret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
};

const validateToken = async (token: string): Promise<ILogin> => {
  const jwtSecret = await readJwtSecret();
  const validatedToken = jwt.verify(token, jwtSecret);
  return validatedToken as ILogin;
};

export {
  readJwtSecret,
  createToken,
  validateToken,
};
