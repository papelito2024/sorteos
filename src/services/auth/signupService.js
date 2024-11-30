
import Users from "../../models/users.js";
import RegisterEmail from "../../helpers/mail/register.js";
import AuthExceptions from "../../utils/exceptions/authExceptions.js";
import TokenManager from "../../utils/tokenManager/tokenManger.js";


export default class SignupService {

    constructor(parameters) {

    }


    async saveUser(data) {
            /**
             * save the user in the database
             */

            const user = new Users(data)

            await user.save()

            /**
             * put the user in the locals to retrieve next middlewares
             */

            return user
    }



    async generateTokens(id) {

        /**
         *  generate tokens
         * 
         *  token manager logic access and refresh token
         */

        const tokenManager = new TokenManager({_id:id})

        const accessToken = tokenManager.generateAccessToken()

        const refreshToken = tokenManager.generateRefreshToken()
        console.log(accessToken)
        console.log(refreshToken)

        tokenManager.saveRefreshToken()


        return {

            accessToken,
            refreshToken
        }
    }

    setCookies(res,accessToken,refreshToken){


       res. cookie("accessToken", accessToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 7 * 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });

    }

    startSession(req,user) {


        /**
    * generate user session
    *
    */

        req.session.user = {
            _id: user._id,
            username: user.username,
            rol: user.rol,
            emial: user.email,
        };
    }



    async sendEmail(data) {

   

            const { username, token, email } = data

            //send email

            /***
             *  
             *  send email
              */

            const info = await registerEmail({
                to: email,
                key: token,
                username: username,
                subject: "registration account verifing"
            })

            return res.status(200).json({
                status: "success",
                message: "user added successfully",
                data: {
                    token: accessToken,
                },
            })


    }











}