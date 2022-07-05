import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import productsRouter from './products/products.router';
import cartsRouter from './cart/cart.router';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('*', (_: Request, res: Response) => {
    res.status(404).send({
        error: -2,
        description: 'Ruta no implementada'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 [Server]: Server is running at port ${PORT}`);
}).on('error', (error) => {
    console.error('⚠️ [Server]: Error on server', error);
});