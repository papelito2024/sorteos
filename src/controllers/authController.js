
import { ForgotService, SignupService, SigninService, VerifyService, RefreshService } from "../services/auth/index.js"
import AuthExceptions from "../utils/exceptions/authExceptions.js"
import Controller from "./controller.js"



export default class AuthController {

    constructor() {
      
    }

    async signin(req, res, next) {


        try {

            const signin= new SigninService(req,res,{
                email:req.body.email,
                password:req.body.password
            })
           
           const user = await  signin.validateAccess()


            const{accessToken,refreshToken}=signin.generateTokens()

          
           signin.setCookies()


            signin.startSession()


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

        console.log("Asdasdasd")
        try {
            
            const signup = new SignupService(req, res, req.body)

            const user = await  signup.saveUser()
          
            signup.generateTokens()


            signup.setCookies()

            
            signup.startSession()
      

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

    async signout(req,res,next){
        try {
            if (req.session.user) req.session.destroy()

            if (req.cookies.accessToken) res.clearCookie("accessToken")
            if (req.cookies.accessToken) res.clearCookie("refreshToken")
        } catch (error) {
            console.log(error)
        }
       

        return res.status(200).json({
            status: "success",
            message: "you have close your session successfully",

        })
    }


    forgot(req, res, next) {

        try {


            const forgot = new ForgotService(req, res, { key, ...req.body })
            const key = req.params.key

            if (key == "send-email") {


                forgot.getUserFromDb()


                forgot.generateExpireToken()

                forgot.sendEmail()

                /**
            * send the response to the client
            */


                return res.status(201).json({
                    status: "success",
                    messagge: "email sended succesfully",

                })

            } else if (key == "reset-password") {

                this.resetPassword()

                return res.status(201).json({
                    status: "success",
                    messagge: "password changed successfully",

                })
            }

            else {

                forgot.checkTokens()

                return res.status(201).json({
                    status: "success",
                    messagge: "tokenes checked useer verificated",

                })

            }



        } catch (error) {

            
            const auth = new AuthExceptions(error)

            auth.handler()

            return res.status(401).json(auth.getErrorResponseFormat())

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