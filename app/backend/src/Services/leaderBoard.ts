import Matchs from '../database/models/Matchs';
import Clubs from '../database/models/Clubs';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import leaderboard from '../helper/leaderBoard';

const createTable = async (eachClub: Clubs, name: string) => {
  const findedHomeTeam = await Matchs.findAll({ where: { homeTeam: eachClub.id, in_progress: 0 } });
  const victoryAndLosePoints = leaderboard.pointsVictoryLoses(findedHomeTeam);
  const goals = leaderboard.sumGoals(findedHomeTeam);
  const efficiencyCalculation = leaderboard
    .efficiency(victoryAndLosePoints.totalPoints, findedHomeTeam.length);

  const formatingTable: ILeaderBoard = {
    name,
    totalPoints: victoryAndLosePoints.totalPoints,
    totalGames: findedHomeTeam.length,
    totalVictories: victoryAndLosePoints.totalVictories,
    totalDraws: victoryAndLosePoints.totalDraws,
    totalLosses: victoryAndLosePoints.totalLosses,
    goalsFavor: goals.goalsFavor,
    goalsOwn: goals.goalsOwn,
    goalsBalance: goals.goalsBalance,
    efficiency: efficiencyCalculation,
  };

  return formatingTable;
};

export default createTable;
