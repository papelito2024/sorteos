import { Router } from "express"

import validation from "../middleware/validation/validation.js"

import Access from "../middleware/access/access.js"

import AuthController from "../controllers/authController.js"

const authController = new AuthController()
const access = new Access()
const authRouter=Router()
 



authRouter.post("/signin",access.access("guest"),validation("auth","signin"),authController.signin);

authRouter.post("/signup",  access.access("guest"), validation("auth", "signup"),  authController.signup);

authRouter.post("/signout", access.access("user"),authController.signout);

authRouter.post("/verify/:key", access.access("user"), authController.verify );

authRouter.post("/forgot/:key", access.access("guest"), validation("auth", "forgot"), authController.forgot);

authRouter.post("/refresh-token", authController.refresh);




export default authRouter;