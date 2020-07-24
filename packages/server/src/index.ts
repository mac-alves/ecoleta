import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';

/**
 * Configs
 */
const app = express();
app.use(cors())
app.use(express.json())
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(errors());

/**
 * Init Server
 */
app.listen(3333, () => {
    console.log(`Server started in ${process.env.APP_URL}`)
});
