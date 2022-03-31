import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { IMatch } from '../interfaces/IMatch';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import Users from '../database/models/Users';

export const findAll = async () => {
  const all = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
    ] });

  if (!all.length) throw new Error('No matches found');

  return { data: all };
};

export const findByInProgress = async (inProgress: boolean) => {
  const allInProgress = await Matchs.findAll({
    where: { inProgress },
    include: [
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
    ] });

  if (!allInProgress.length) throw new Error('No matches found');

  return { data: allInProgress };
};

export const findAndCreateInProgressMatch = async (dataMatch: IMatch) => {
  const awayClubIsValid = await Matchs.findOne({ where: { awayTeam: dataMatch.awayTeam } });
  const awayHomeIsValid = await Matchs.findOne({ where: { homeTeam: dataMatch.homeTeam } });

  if (!awayClubIsValid || !awayHomeIsValid) throw new Error('There is no team with such id!');

  const created = await Matchs.create(dataMatch);

  return { data: created };
};

export const updateGoals = async (id: number, homeTeam: number, awayTeam: number) => {
  const updatedGoals = await Matchs.update(
    {
      awayTeamGoals: awayTeam,
      homeTeamGoals: homeTeam,
    },
    { where: { id } },
  );

  return updatedGoals;
};

const verifyTokenToValidate = async (decoded: string | jwt.JwtPayload) => {
  if (typeof decoded === 'string') return '';
  const user = Users.findOne({ where: { email: decoded.email } });

  if (!user) throw new Error('Incorrect email or password');

  return user;
};

export const getMatchToValidate = async (token: string) => {
  // depois de muito sofrimente descobri que meu Helper jwt da problema quando utilizo
  // por retornar uma promise<string> e não uma string, então o teste roda infinito e crasha
  // nota para eu voltar e refatorar
  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8');
  const decodedToken = jwt.verify(token, jwtSecret);
  const verified = await verifyTokenToValidate(decodedToken);
  return { auth: verified };
};

export const updateStatusInProgress = async (id: number) => {
  const updatedStatus = await Matchs.update({ inProgress: false }, { where: { id } });

  return updatedStatus;
};
