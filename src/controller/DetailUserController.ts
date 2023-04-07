import { Request, Response } from "express";
import { DetailUserService } from "../services/user/DetailUserUserService";


class DetailUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const detailUserSerice = new DetailUserService();
        const user = await detailUserSerice.execute(user_id);
        return res.json(user)
    }
}


export { DetailUserController };