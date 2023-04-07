import { Request, Response, Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { AuthUserController } from "./controller/AuthUserController";
import { DetailUserController } from "./controller/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controller/CreateCategoryController";
import { ListCategoryController } from "./controller/ListCategoryController";
import { CreateProductController } from "./controller/CreateProductController";
import { CreateOrderController } from "./controller/CreateOrderController";
import { RemoveOrderController } from "./controller/RemoveOrderController";
import { AddItemController } from "./controller/AddItemController";
import { RemoveItemController } from "./controller/RemoveItemController";
import { SendOrderController } from "./controller/SendOrderController";
import { DetailOrderService } from "./services/order/DetailOrderService";
import { FinishOrderController } from "./controller/FinishOrderController";

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
// routes.get("/category/product", isAuthenticated, new ListCategoryController().handle)

//Rotas ORDER
routes.post("/order", isAuthenticated, new CreateOrderController().handle);
routes.delete("/order", isAuthenticated, new RemoveOrderController().handle);
routes.post("/order/add", isAuthenticated, new AddItemController().handle);
routes.delete("/order/remove", isAuthenticated, new RemoveItemController().handle);
routes.put("/order/send", isAuthenticated, new SendOrderController().handle);
routes.get("/order/detail", isAuthenticated, new DetailUserController().handle);
routes.put("/order/finish", isAuthenticated, new FinishOrderController().handle);

export { routes };