
import Users from "../../models/users.js";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
import AuthService from "./authServices.js";

export default class RefreshService extends AuthService {
    constructor(req,res) {
        super(req,res)
    }



   

async refreshToken() {

    

    const decoded  =await this.getUserFromToken()
        
        // Buscar el refresh token en la base de datos
        const user = await Users.findOne({ _id: decoded._id});

        if (!user || user.refreshToken !== refreshToken) throw new AccessError("INVALID", "corrupt or invalid refresh token ");


    const tokenManager = new TokenManager(user)
        // Crear un nuevo access token
        const accessToken = tokenManager.generateAccessToken();

       this. res.cookie("accessToken", accessToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 15* 60* 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });


       this. res.json({
            status: "success",
            code: 200,
            message: "token refreshed successfully"
        });


   




    } 
}
