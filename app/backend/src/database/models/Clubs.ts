import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id!: number;

  public clubName!: string;
}

Clubs.init({

  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  clubName: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,

});

Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'awayMatch' });
Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'homeMatch' });

export default Clubs;
