import { Router, Request, Response } from "express";

const productsRouter: Router = Router();

productsRouter.get('/test', (_: Request, res: Response) => {
    res.send({ 'Vengo desde otro archivo': 'Jeje, ta bien' })
});

export default productsRouter;