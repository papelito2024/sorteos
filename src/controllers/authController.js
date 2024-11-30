
import { ForgotService, SignupService, SigninService, VerifyService, RefreshService } from "../services/auth/index.js"
import AuthExceptions from "../utils/exceptions/authExceptions.js"
import Controller from "./controller.js"

export default class AuthController {

    constructor() {
        
       
    }

    async signin(req, res, next) {


        try {

            const signin= new SigninService({
                email:req.body.email,
                password:req.body.password
            })
           
           const user = await  signin.validateAccess()


            const{accessToken,refreshToken}=signin.generateTokens(user._id)

          
           signin.setCookies(res,accessToken,refreshToken)


            signin.startSession(req,user)


            res.status(200).json({
                status: "success",
                message: "logged  successfully",
                code: 200,
                data: {
                    token: accessToken,
                },
            });


        } catch (error) {

            console.log("Asdasdasd")
            const auth = new AuthExceptions(error)

            auth.handler()

            return res.status(401).json(auth.getErrorResponseFormat())
        }


    }

    async signup(req,res,next){


        try {
            
            const signup = new SignupService()


            const user =await  signup.saveUser(req.body)



            const { accessToken, refreshToken } = signup.generateTokens(user._id)


            signup.setCookies(res, accessToken, refreshToken)

            
            signup.startSession(req,user)
        /*   
            signupService.sendEmail({
                email:user.email,
                token:user.tokens[0].token,
                username:user.usernmae
            }) */


            res.status(200).json({
                status:"success",
                message:"user added successfully"
            })

        } catch (error) {

          //  console.log("asdasd")
            const auth = new AuthExceptions(error)

            auth.handler()

            return res.status(401).json(auth.getErrorResponseFormat())
        }
        
        
    }

    signout(req,res,next){

        if (req.session.user) req.session.destroy()

        if (res.cookies.accessToken) res.clearCookie("accessToken")
        if (res.cookies.accessToken) res.clearCookie("refreshToken")

        return res.status(200).json({
            status: "success",
            message: "you have close your session successfully",

        })
    }


    forgot(req,res,next){

       try {
            const key = req.params.key

            if (key =="send"){


                /**
              * send the response to the client
              */

                return res.status(201).json({
                    status: "success",
                    messagge: "email sended succesfully",

                })
            }
            
        
       } catch (error) {
        
       }
    }


    verify(req,res,next){
        try {




            return res.status(201).json({
                status: "success",
                messagge: "email sended succesfully",

            })
        } catch (error) {

            return res.status(401).json({
                status: "error",
                message: error.message,
                code: error.name
            })
        }
       
    }


    refresh(){
        
    }

}