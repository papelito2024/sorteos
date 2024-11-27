import { Router } from "express";

import validation from "../middleware/validation/validation.js"

import Access from "../middleware/access/access.js";

import {forgotMiddlewares,verifyMiddleware} from "../middleware/auth/index.js"

const authController = new AuthController()
const access = new Access()
const authRouter=Router()
 



authRouter.post("/signin",access.access("guest"),validation("auth","signin"),(req,res)=>res.send("asd"));

authRouter.post("/signup", access.access("guest"),/*validation("auth","signup")*/(req, res) => res.send("asd"));

authRouter.post("/signout", access.access("user")(req, res)=> res.send("asd"));

authRouter.post("valite/:key", verifyMiddleware);

authRouter.post("forgot/:key", forgotMiddlewares);

authRouter.post("/refresh-token", (req, res) => res.send("asd"));




export default authRouter;