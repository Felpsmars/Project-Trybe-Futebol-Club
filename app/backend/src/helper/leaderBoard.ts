import Matchs from '../database/models/Matchs';

const sumGoals = (dataMatch: Matchs[]) => {
  const goalsOwn = dataMatch.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const goalsFavor = dataMatch.reduce((acc, match) => acc + match.homeTeamGoals, 0);

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const efficiency = (points: number, matchs: number) => {
  const calculateEfficiency = ((points / (matchs * 3)) * 100).toFixed(2);

  return +calculateEfficiency;
};

const pointsVictoryLoses = (dataMatch: Matchs[]) => {
  const totalLosses = dataMatch
    .reduce((acc, match) => (match
      .homeTeamGoals < match.awayTeamGoals ? acc + 1 : acc), 0);

  const totalDraws = dataMatch
    .reduce((acc, match) => (match
      .homeTeamGoals === match.awayTeamGoals ? acc + 1 : acc), 0);

  const totalVictories = dataMatch
    .reduce((acc, match) => (match
      .homeTeamGoals > match.awayTeamGoals ? acc + 1 : acc), 0);

  const totalPoints = (totalVictories * 3) + (totalDraws);

  return { totalVictories, totalLosses, totalDraws, totalPoints };
};

export default { sumGoals, pointsVictoryLoses, efficiency };

// uso do https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
