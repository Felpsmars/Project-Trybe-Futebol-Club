import * as express from 'express';
import loginRoute from './Routes/login.routes';

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
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);

    this.app.use(express.json());

    this.app.use('/login', loginRoute);
    this.app.use('/login/validate', loginRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
