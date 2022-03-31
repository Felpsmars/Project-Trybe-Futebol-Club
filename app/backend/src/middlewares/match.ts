import { Request, Response, NextFunction } from 'express';

const verifyTeams = (HT: number, AT: number) => {
  if (HT === AT) {
    return {
      error: {
        message: 'It is not possible to create a match with two equal teams',
      },
    };
  }
  return null;
};

const validationMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (!homeTeam || !awayTeam) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const verifiedTeams = verifyTeams(homeTeam, awayTeam);

  if (verifiedTeams) {
    return res.status(401).json({ message: verifiedTeams.error.message });
  }

  return next();
};

export default validationMatch;
