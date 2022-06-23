import express, { Express, Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const router: Router = Router();

const PORT = process.env.PORT || 8080;

app.get('/', (_: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`⚡️ [Server]: Server is running at http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('[Server]: Error on server', error);
});
