import { Router } from "express";

const authRouter=Router()

authRouter.post("signin",(req,res)=>{


    res.send("signin")
})

authRouter.post("signup", (req, res) => {
  res.send("signin");
});

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