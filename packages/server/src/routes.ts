import express from 'express';
const routes = express.Router();

import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

const itemController = new ItemController();
const pointController = new PointController();

routes.get('/items', itemController.index);
routes.get('/points', pointController.index)
routes.post('/points', pointController.create)
routes.get('/points/:id', pointController.show)

export default routes;