import { Request } from "express";
import moment from "moment";
import Product from "./product.model";

export default class ProductUtils {
    private static TIMESTAMP_FORMAT = 'DD/MM/YYYY - HH:mm:ss';

    public static buildProductFromRequest = (req: Request): Product => {
        const { name, thumbnail, price, stock } = req.body;
        return new Product(name, price, thumbnail, moment().format(moment().format(ProductUtils.TIMESTAMP_FORMAT)), stock);
    }
}