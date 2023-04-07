import { Request, Response, NextFunction } from "express";
import jwtConfig from "../config/jwtConfig";
import { verify } from "jsonwebtoken";


//https://jwt.io/

interface Payload {
    id: string;
};

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send();
    }

    try {

        const [, token] = authToken.split(" ");
        const { id } = verify(
            token,
            jwtConfig.secretKey
        ) as Payload;

        req.user_id = id;

        return next();

    } catch (error) {
        return res.status(401).end();
    }
}