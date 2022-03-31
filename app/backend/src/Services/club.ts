import Clubs from '../database/models/Clubs';
import { IClub } from '../interfaces/IClub';

const getAllClub = async () => {
  const findedAll: IClub[] = await Clubs.findAll();

  return findedAll;
};

const findClub = async (id: string) => {
  const club: IClub | null = await Clubs.findOne({ where: { id } });

  return club;
};

export default {
  getAllClub,
  findClub,
};
