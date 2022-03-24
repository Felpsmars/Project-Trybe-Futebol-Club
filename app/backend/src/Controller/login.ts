import { Request, Response } from 'express';
import { createToken } from '../helper/jwt';
import userService from '../Services/login';
import IUsers from '../interfaces/IUsers';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userBody = req.body;

  const token = await createToken(userBody);
  try {
    const user: IUsers = await userService.findUser({ email, password });

    return res.status(200).json({ user, token });
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

export default {
  login,
};
