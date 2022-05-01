import { Response, Request } from "express";
import { CreateProductService } from "../services/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {

        const { name, price, description, banner, category_id } = req.body;
        const createProductService = new CreateProductService();
        const { file }: any = req;

        if (!file) {
            throw new Error('Error to upload file')
        } else {

            const product = await createProductService.execute({ name, price, description, banner, category_id });

            return res.json(product);

        }
    };
};

export { CreateProductController };