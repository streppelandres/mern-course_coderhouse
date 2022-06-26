import { Router, Request, Response } from "express";
import Container from "../container/container.utils";

const productsRouter: Router = Router();

// TODO: Mover esto, no deberia estar en router
const productsContainer: Container = new Container("14-class_01-final_products.json");

productsRouter.get('/:id?', async (req: Request, res: Response) => {
    const id = req.params.id;
    res.send(
        id ?
            await productsContainer.getById(Number(id))
            :
            await productsContainer.getAll()
    );
});

export default productsRouter;