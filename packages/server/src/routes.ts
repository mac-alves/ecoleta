import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

/**
 * Import validators
 */
import CreatePointValidator from './validator/CreatePoint';

/**
 * Import Controllers
 */
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

/**
 * Config
 */
const routes = express.Router();
const upload = multer(multerConfig);

/**
 * Instance Controllers
 */
const itemController = new ItemController();
const pointController = new PointController();

/**
 * Routes
 */
routes.get('/items', itemController.index);
routes.get('/points', pointController.index)
routes.get('/points/:id', pointController.show)
routes.post(
    '/points', 
    upload.single('image'),
    CreatePointValidator(),
    pointController.create
)

export default routes;