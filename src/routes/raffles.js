import { Router } from "express"

import validation from "../middleware/validation/validation.js"

import Access from "../middleware/access/access.js"

import RafflesController from "../controllers/rafflesController.js"



const rafflesController = new RafflesController()

const access = new Access()

const rafflesRouter = Router()




rafflesRouter.post("/create", validation("raffles", "create") ,rafflesController.create)

rafflesRouter.post("/edit/:id", rafflesController.edit);

rafflesRouter.post("/delete/:id", access.access("mod"), rafflesController.delete);

rafflesRouter.post("/get", access.access("mod"), rafflesController.get);



rafflesRouter.post("/awards/remove", access.access("mod"), rafflesController.get);

rafflesRouter.post("/awards/add", access.access("mod"), rafflesController.get);



rafflesRouter.post("/edit/:id/participants/:action", validation("raffles", "edit"),  rafflesController.participants);




rafflesRouter.post("/edit/:id/awards/:action", rafflesController.awards);


export default rafflesRouter;