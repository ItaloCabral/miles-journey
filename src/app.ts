import express from 'express';
import cors from "cors";

import { briefRoutes } from './routes/brief-routes';
import { env } from './env';

const app = express();

app.use(express.json());

app.use(cors({
    origin: env.APP_URL
}));

app.use('/api', briefRoutes);

export {
    app as App
}

