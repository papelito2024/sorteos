import { Router } from "express";

import validation from "../middleware/validation/validation.js"
import AuthController from "../controllers/authController.js"
import Access from "../middleware/access/access.js";

const authController = new AuthController()
const access = new Access()
const authRouter=Router()
 



authRouter.post("/signin",access.access("guest"),validation("auth","signin"), authController.signin);

authRouter.post("/signup",access.access("guest"),/*validation("auth","signup")*/ authController.signup);

authRouter.post("/signout",(req,res)=>res.send("asd"));

authRouter.post("valite/:key", (req, res) => {
  res.send("signin");
});


authRouter.post("reset", (req, res) => {
  res.send("signin");
});


authRouter.post("refresh", (req, res) => {
  res.send("signin");
});


authRouter.post("/refresh-token", authController.refreshToken);




export default authRouter;