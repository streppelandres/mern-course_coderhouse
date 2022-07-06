export default class ProductModel implements ContainerModel {
    name: string;
    price: number;
    thumbnail: string;
    stock: number;
    timestamp: string;
    id: number;

    constructor(name: string, price: number, thumbnail: string, timestamp: string, stock: number) {
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.timestamp = timestamp;
        this.id = 0;
    }

}