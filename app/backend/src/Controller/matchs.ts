import { NextFunction, Request, Response } from 'express';
import * as MatchsService from '../Services/matchs';

export const findAndGetAllMatchs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await MatchsService.findAll();
    const { inProgress } = req.query;

    if (inProgress) {
      return next();
    }

    return res.status(200).json(data);
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

export const findByInProgressMatches = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    // tentei por em um if statement mas o lint reclamou do seu tipo e consegui resolver armazenando ele em outra variavel
    const inProgressBoolean = inProgress === 'true';
    const { data } = await MatchsService.findByInProgress(inProgressBoolean);

    return res.status(200).json(data);
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

export const validateAndCreateMatchInProgress = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization || '';
    const { auth } = await MatchsService.getMatchToValidate(authorization);
    if (!auth) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const { data } = await MatchsService.findAndCreateInProgressMatch(req.body);

    return res.status(201).json(data);
  } catch (error: Error | unknown) {
    if (error instanceof Error) return res.status(401).json({ message: error.message });
  }
};

export const updateMatchByInProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  try {
    await MatchsService.updateStatusInProgress(idNum);
    return res.status(200).json({ message: 'The match was updated' });
  } catch (err) {
    console.log('entrou no catch');
  }
};

export const updateMatchByGoals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  try {
    await MatchsService.updateGoals(+id, +homeTeamGoals, +awayTeamGoals);

    return res.status(200).json({ message: 'The match was updated' });
  } catch (err) {
    console.log('entrou no catch');
  }
};
