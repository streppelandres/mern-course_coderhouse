class Product implements ContainerModel {
    name: string;
    price: number;
    thumbnail: string;
    id: number;

    constructor(name: string, price: number, thumbnail: string, id: number) {
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }

}