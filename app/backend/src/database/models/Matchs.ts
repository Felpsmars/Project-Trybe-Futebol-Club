import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}
Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'matchs',
});

Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });

Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', as: 'awayClub' });
Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', as: 'homeClub' });

export default Matchs;
