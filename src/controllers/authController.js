
import { ForgotService, SignupService, SigninService, VerifyService, RefreshService } from "../services/auth/index.js"
import AuthExceptions from "../utils/exceptions/authExceptions.js"
import Controller from "./controller.js"



export default class AuthController extends Controller {

    constructor() {
      super()
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

            
            const auth = new AuthExceptions(error)

            auth.handler()

            return res.status(401).json(auth.getErrorResponseFormat())
        }


    }

    async signup(req,res,next){

       
        try {
            
            const signup = new SignupService(req,res,req.body)

            const user = await  signup.saveUser()
          
            signup.generateTokens()


            signup.setCookies()

            
          //  signup.startSession()
      

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

            const key =req.params.key
            const verify = new VerifyService(req,res)
            /*
            1 make to be sure first that the user has a session already by checking the access token
              1a-if the user doenst havee athe accesstoken then we take a look for the refresh
              1b-otherwise send the user to loggin

            2 step check the key value  if is resend then send a new email verify to the user  
                2a-send the email to the user 
            
            */
            
            if(key=="resend"){


                verify.resend()

                return res.status(201).json({
                    status: "success",
                    messagge: "email sended succesfully",

                })

            }
            /*
            3-if we get the key we need to fetch the coonfirm token from the db user and 
                3a- check expiration if it is expired then send a error response 
            */

            else{
            
                verify.checkTokens(key)


                return res.status(201).json({
                    status: "success",
                    messagge: "user email verified correctly",

                })
                
            }
                /*
            4 if the confirm token is valid we need to check if they match we need to be sure that the key 
            in the request is the same generated when sent the email 
                4a- if not match then the key is corrupted or alter 
            
            5 if everything its ok then snd a success messsage and update the user verified property 
            a
             */

            
        } catch (error) {

            return res.status(401).json({
                status: "error",
                message: error.message,
                code: error.name
            })
        }
       
    }
 

    refresh(req,res,next){

        try {
            
            const refresh = new RefreshService()


            refresh.refreshToken()

        } catch (error) {

            const auth = new AuthExceptions(error)

            auth.handler()

            return res.status(401).json(auth.getErrorResponseFormat())
            
        }
    }

}