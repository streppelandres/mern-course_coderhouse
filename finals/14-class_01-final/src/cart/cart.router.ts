import { Router, Request, Response } from "express";
import Container from "../container/container.utils";
import CartUtils from "./cart.utils";

const cartsRouter: Router = Router();

// TODO: Mover esto, no deberia estar en router
const container: Container = new Container('14-class_01-final_carts.json');

// TODO: Capaz estaría bueno que reciba nada más los id's de los productos a guardar
// y en el get, antes de devolverlo, cargar todos los productos
cartsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id = await container.saveOne(CartUtils.buildCartFromRequest(req));
        res.status(200).send({
            message: `Cart guardado con el id ${id}`,
            id: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'No se pudo guardar el carrito' });
    }
});

cartsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await container.deleteById(Number(id));
        res.status(200).send({
            message: `Carrito con el id ${id} eliminado`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `No se pudo eliminar el carrito con el id ${id}` });
    }
});

cartsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const product: ContainerModel = await container.getById(Number(id));
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `No se pudo cargar el carrito con el id ${id}` });
    }
});

export default cartsRouter;