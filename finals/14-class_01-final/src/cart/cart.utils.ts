import { Request } from "express";
import moment from "moment";
import CartModel from "./cart.model";
import ProductModel from "../products/product.model";

export default class CartUtils {
    private static TIMESTAMP_FORMAT = 'DD/MM/YYYY - HH:mm:ss';

    public static buildCartFromRequest = (req: Request): CartModel => {
        return new CartModel(moment().format(moment().format(CartUtils.TIMESTAMP_FORMAT)), (req.body as Array<ProductModel>));
    }
}