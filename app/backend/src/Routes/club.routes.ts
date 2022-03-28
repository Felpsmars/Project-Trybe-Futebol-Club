import * as express from 'express';
import clubsController from '../Controller/clubs';

const clubs = express.Router();

clubs.get('/', clubsController.getAll);

clubs.get('/:id', clubsController.getById);

export default clubs;
