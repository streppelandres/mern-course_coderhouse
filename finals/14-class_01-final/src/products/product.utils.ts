import { Request } from "express";
import moment from "moment";
import ProductModel from "./product.model";

export default class ProductUtils {
    private static TIMESTAMP_FORMAT = 'DD/MM/YYYY - HH:mm:ss';

    public static buildProductFromRequest = (req: Request): ProductModel => {
        const { name, thumbnail, price, stock } = req.body;
        return new ProductModel(name, price, thumbnail, moment().format(moment().format(ProductUtils.TIMESTAMP_FORMAT)), stock);
    }
}