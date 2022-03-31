import { Request } from 'express';

export interface IEmail extends Request {
  email?: string;
}
