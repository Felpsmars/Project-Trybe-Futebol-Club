import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { readJwtSecret } from '../helper/jwt';

const validationJwt = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token not found' });

  const jwtSecret = await readJwtSecret();
  const validatedToken = jwt.verify(header, jwtSecret);

  if (!validatedToken) res.status(401).json({ message: 'Invalid token' });

  next();
};

export default validationJwt;
