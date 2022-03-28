import { Request, Response } from 'express';
import { IClub } from '../interfaces/IClub';
import clubsService from '../Services/club';

const getAll = async (_req: Request, res: Response) => {
  const all: IClub[] = await clubsService.getAllClub();

  return res.status(200).json(all);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundedClub = await clubsService.findClub(+id);

  if (foundedClub) return res.status(200).json(foundedClub);

  return res.status(404).json({ message: 'Club not found' });
};

export default {
  getAll,
  getById,
};
