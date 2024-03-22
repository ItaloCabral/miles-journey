import express from 'express';
import { briefRoutes } from './routes/brief-routes';

const app = express();

app.use(express.json());

app.use('/briefs', briefRoutes); 

export {
    app as App
}

