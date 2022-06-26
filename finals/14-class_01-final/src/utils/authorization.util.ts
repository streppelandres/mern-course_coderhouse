import { Router, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const IS_ADMIN = process.env.IS_ADMIN || 'true';

const checkAuthorization = (url: string, method: string, res: Response) => {
    if(IS_ADMIN == 'true') {
        return true;
    } else {
        res.status(501).send({
            error: -1,
            message: `url ${url} method ${method} not authorized`
        })
        return false;
    }
}

export default checkAuthorization;