
import Users from "../../models/users.js";
import TokenManager from "../../utils/tokenManager/tokenManger.js";


export default class RefreshService {
    constructor(parameters) {
        
    }

    async checkRefreshToken({refresh}){

        
    }

async refreshToken({refreshToken,}) {

   

    const tokenManager = new TokenManager({})

   
        if (!refreshToken) throw new AccessError("UNDEFINED", " refresh token not found ");

        // Verificar si el refresh token es válido
        const decoded = tokenManager.verifyToken(refreshToken, process.env.JWT_TOKEN_REFRESH_SECRET);

        if (!decoded) throw new AccessError("EXPIRED", " refresh token has expired ");

        // Buscar el refresh token en la base de datos
        const user = await Users.findOne({ _id: decoded._id, "tokens.tokenType": "refresh" },

        );

        if (!user || user.refreshToken !== refreshToken) throw new AccessError("INVALID", "corrupt or invalid refresh token ");

        // Crear un nuevo access token
        const accessToken = tokenManager.generateAccessToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });


        res.json({
            status: "success",
            code: 200,
            message: "token refreshed successfully"
        });


   




    } 
}
