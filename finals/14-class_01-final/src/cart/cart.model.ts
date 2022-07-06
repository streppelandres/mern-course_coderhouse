import ProductModel from "../products/product.model";

export default class CartModel implements ContainerModel {
    id: number;
    timestamp: string;
    productos: Array<ProductModel>;

    constructor(timestamp: string, productos: Array<ProductModel>) {
        this.timestamp = timestamp;
        this.productos = productos;
        this.id = 0;
    }
}