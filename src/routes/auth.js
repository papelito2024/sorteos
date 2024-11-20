import { Router } from "express";

import validation from "../middleware/validation/validation.js"
import AuthController from "../controllers/authController.js"

const authController = new AuthController();

const authRouter=Router()
 



authRouter.post("/signin",validation("auth","signin"), authController.signin);

authRouter.post("/signup",validation("auth","signup"), authController.signup);

authRouter.post("signout", (req, res) => {
  res.send("signin");
});

authRouter.post("valite/:key", (req, res) => {
  res.send("signin");
});

authRouter.post("reset", (req, res) => {
  res.send("signin");
});


authRouter.post("refresh", (req, res) => {
  res.send("signin");
});



authRouter.post("signin", (req, res) => {
  res.send("signin");
});




export default authRouter;