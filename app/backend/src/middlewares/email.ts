import { NextFunction, Request, Response } from 'express';

const incorrectField = 'All fields must be filled';

const validationEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) return res.status(401).json({ message: incorrectField });

  next();
};

export default validationEmail;
