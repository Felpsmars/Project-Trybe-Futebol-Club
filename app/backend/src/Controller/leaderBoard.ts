import { Request, Response } from 'express';
import Clubs from '../database/models/Clubs';
import generateTableForHome from '../Services/leaderBoard';

export const pointsHT = async (_req: Request, res: Response) => {
  const all = await Clubs.findAll();

  const allData = await Promise.all(all
    .map((eachClub) => generateTableForHome(eachClub, eachClub.clubName)));
  const sortedData = allData
    .sort((firstTeam, secondTeam) =>
      secondTeam.totalPoints - firstTeam.totalPoints
    || secondTeam.goalsBalance - firstTeam.goalsBalance
    || secondTeam.goalsFavor - firstTeam.goalsFavor
    || firstTeam.goalsOwn - secondTeam.goalsOwn);

  return res.status(200).json(sortedData);
};

export const pointsAT = async (_req: Request, _res: Response) => {
  const all = await Clubs.findAll();

  return all;
};

// uso do Promise https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
