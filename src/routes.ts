import { Request, Response, NextFunction, Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { AuthUserController } from "./controller/AuthUserController";
import { DetailUserController } from "./controller/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controller/CreateCategoryController";
import { ListCategoryController } from "./controller/ListCategoryController";
import { CreateProductController } from "./controller/CreateProductController";
import uploadConfig from '../config/multer';
import multer from "multer";


const routes = Router();

// const upload = multer(uploadConfig.upload("./temp"));


//Rota de teste da API

routes.get("/test", (req: Request, res: Response) => {
    return res.json({
        status: 200,
        message: "API OK"
    });
});

//Rotas de Usuário
routes.post("/users", new CreateUserController().handle);
routes.post("/session", new AuthUserController().handle);
routes.get("/me", isAuthenticated, new DetailUserController().handle);


//Rotas de Categorias
routes.post("/category", isAuthenticated, new CreateCategoryController().handle);
routes.get("/category", isAuthenticated, new ListCategoryController().handle);

//Rota de Produtos
routes.post("/product", isAuthenticated, new CreateProductController().handle);

export { routes };