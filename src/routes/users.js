import { Router } from "express"

import validation from "../middleware/validation/validation.js"

import Access from "../middleware/access/access.js"

import UserController from "../controllers/userController.js"



const userController = new UserController()

const access = new Access()

const userRouter = Router()




userRouter.post("/add", access.access("mod"), validation("user", "signin"), userController.create);

userRouter.post("/edit/:id", access.access("mod"), validation("user", "signup"), userController.edit);

userRouter.post("/delete/:id", access.access("mod"), userController.delete);

userRouter.post("/get", access.access("mod"), userController.get);




export default userRouter;