import { Router, Request, Response } from "express";
import Container from "../container/container.utils";
import Product from "./product.model";
import checkAuthorization from "../utils/authorization.util";

const productsRouter: Router = Router();

// TODO: Mover esto, no deberia estar en router
const productsContainer: Container = new Container("14-class_01-final_products.json");

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const productos: Array<ContainerModel> = await productsContainer.getAll();
        res.status(200).send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'No se pudo cargar los productos' });
    }
});

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const product: ContainerModel = await productsContainer.getById(Number(id));
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `No se pudo cargar el producto con el id ${id}` });
    }
});

productsRouter.post('/', async (req: Request, res: Response) => {
    if (!checkAuthorization('/products', 'post', res)) return;
    try {
        const { name, thumbnail, price } = req.body;
        const id = await productsContainer.saveOne(new Product(name, price, thumbnail));
        res.status(200).send({
            message: `Producto guardado con el id ${id}`,
            id: id
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'No se pudo guardar el producto' });
    }
});

productsRouter.put('/:id', async (req: Request, res: Response) => {
    if (!checkAuthorization('/products', 'put', res)) return;
    try {
        const { name, thumbnail, price } = req.body;
        await productsContainer.updateOne(Number(req.params.id), new Product(name, price, thumbnail));
        res.status(200).send({
            success: `Producto actualizado con el id [${req.params.id}]`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'No se pudo actualizar el producto' });
    }
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    if (!checkAuthorization('/products', 'delete', res)) return;
    const id: string = req.params.id;
    try {
        await productsContainer.deleteById(Number(id));
        res.status(200).send({
            message: `Producto con el id ${id} eliminado`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `No se pudo eliminar el producto con el id ${id}` });
    }
});

export default productsRouter;