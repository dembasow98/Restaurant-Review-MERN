import express from 'express';
import cors from 'cors';
import restaurants from './api/restaurant.route.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/restaurants', restaurants);
app.use('*', (req, res) => { res.status(404).send({ status: 404, message: 'Not found'})});

export default app;