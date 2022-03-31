import * as express from 'express';
import * as cors from 'cors';
import loginRoute from './Routes/login.routes';
import clubsRoute from './Routes/club.routes';
import * as matchs from './Controller/matchs';
import validationMatch from './middlewares/match';
import * as leaderboard from './Controller/leaderBoard';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use('/login', loginRoute);
    this.app.use('/login/validate', loginRoute);

    this.app.use('/clubs', clubsRoute);
    this.app.use('/clubs/:id', clubsRoute);

    // tentei fazer um routes para a rota matchs mas só tive problemas de unhealthy container
    this.app.route('/matchs').get(matchs.findAndGetAllMatchs, matchs.findByInProgressMatches)
      .post(validationMatch, matchs.validateAndCreateMatchInProgress);
    this.app.route('/matchs/:id/finish').patch(matchs.updateMatchByInProgress);
    this.app.route('/matchs/:id').patch(matchs.updateMatchByGoals);

    this.app.route('/leaderboard/home').get(leaderboard.pointsHT);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
