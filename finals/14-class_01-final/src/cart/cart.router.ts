import { Router, Request, Response } from "express";
import Container from "../container/container.utils";
import ProductModel from "../products/product.model";
import ProductUtils from "../products/product.utils";
import CartModel from "./cart.model";
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

// FIXME: Código repetido en products.router
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

// FIXME: Código repetido en products.router
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

cartsRouter.post('/:id/products', async (req: Request, res: Response) => {
    // TODO: Mover la lógica de acá
    const cartId: number = Number(req.params.id);

    try {
        let cart: CartModel = await container.getById(Number(cartId)) as CartModel;

        let newProduct: ProductModel = ProductUtils.buildProductFromRequest(req);
        newProduct.id = req.body.id;

        cart.productos.push(newProduct);

        await container.updateOne(cartId, cart);

        res.status(200).send({
            success: `Producto agregado con al carrito [${cartId}]`,
            product: newProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `No se pudo guardar el producto en el carrito [${cartId}]`
        });
    }
});

cartsRouter.delete('/:id/products/:id_prod', async (req: Request, res: Response) => {
    // TODO: Mover la lógica de acá
    const cartId: number = Number(req.params.id);
    const productIdToRemove: number = Number(req.params.id_prod);

    try {
        let cart: CartModel = await container.getById(Number(cartId)) as CartModel;

        cart.productos = cart.productos.filter((p) => {
            return p.id != productIdToRemove;
        });

        await container.updateOne(cartId, cart);

        res.status(200).send({
            success: `Producto [${productIdToRemove}] eliminado del carrito [${cartId}]`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `No se pudo eliminar el producto [${productIdToRemove}] del carrito [${cartId}]`
        });
    }
});

export default cartsRouter;