import { NextFunction, Request, Response } from 'express';

const incorrectLoginMessage = 'Incorrect email or password';
const incorrectField = 'All fields must be filled';

const validationPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) throw new Error(incorrectField);
  if (password.length < 6) throw new Error(incorrectLoginMessage);

  next();
};

export = {
  validationPassword,
};
