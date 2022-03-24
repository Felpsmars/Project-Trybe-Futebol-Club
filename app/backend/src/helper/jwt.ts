import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

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

export {
  readJwtSecret,
  createToken,
};
