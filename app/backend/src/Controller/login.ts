import { Request, Response } from 'express';
import jwt from '../helper/jwt';
import userService from '../Services/login';
import IUsers from '../interfaces/IUsers';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await jwt.createToken({ email });

  try {
    const user: IUsers = await userService.findUser({ email, password });

    return res.status(200).json({ user, token });
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { email } = await jwt.validateToken(token as string);

  try {
    const role = await userService.validate({ email });
    return res.status(200).json(role);
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

export default {
  login,
  verifyToken,
};
