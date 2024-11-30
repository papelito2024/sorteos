

import Users from "../../models/users.js";
import AuthExceptions from "../../utils/exceptions/authExceptions.js";
import AuthError from "../../utils/exceptions/customErrors/authError.js";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
 

export default class signinService {
    constructor(data) {
        this.user=data
    }



    async validateAccess(){


        const user = await Users.findOne(
            { email: this.user.email },
            "_id username email rol valid avatar key password"
        );

        if (user === null) throw new AuthError("invalid credentias");

        if (!(await user.validatePassword(this.user.password)))
            throw new AuthError("invalid credentias");

        return user;
    }


    generateTokens(id){

        const tokenManager = new TokenManager({_id:id})

        /**
         * initialize tokens 
         */

        const accessToken = tokenManager.generateAccessToken()
        const refreshToken = tokenManager.generateRefreshToken()

        tokenManager.saveRefreshToken()

        return {

            accessToken,
            refreshToken
        }
    }


    setCookies(res, accessToken, refreshToken) {


        res.cookie("accessToken", accessToken, {
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


   
    startSession(req,user){


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

   

 


}