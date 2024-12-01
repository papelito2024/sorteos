import TokenManager from "../../utils/tokenManager/tokenManger.js";
import Users from "../../models/users.js";

export default class AuthService {
    constructor(req,res) {
        this.user
        this.accessToken = req.cookies.accessToken ?? ""
        this.refreshToken = req.cookies.refreshToken ?? ""
        this.req=req
        this.res=res
        this.tokenManager= new TokenManager(this.user??{})


    }


    async getUserFromToken(){

        const dec = await this.tokenManager.verifyToken(this.accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
        console.log(dec)

        const user = await Users.findOne({_id:dec.id})

        this.user = user

        return user;
    }


    async getAccessToken(){
        
       return this.accessToken
    }

    getRefreshToken() {
        return this.refreshToken
    }


   async  generateExpireToken({type,key,expiration}){

        const token = await this.user.generateToken({ type:type?? "gen", key: key??"token", expiration: expiration?? new Date.now() + (1000 * 60 * 15) })

        this.token = token
    }

    async getUserFromDb() {
        const user = await Users.findOne({ email: this.user.email })

        this.user = users
    }

    async generateTokens() {

        /**
         *  generate tokens
         * 
         *  token manager logic access and refresh token
         */

        if(!this.user) throw new Error("user no se ha inicializao")

          //  console.log(this.user)
        const tokenManager = new TokenManager(this.user)


        this.accessToken = tokenManager.generateAccessToken()

        this. refreshToken = tokenManager.generateRefreshToken()
       // console.log(this.accessToken)

        tokenManager.saveRefreshToken(this.refreshToken)

        
    }


    setCookies() {

        this.res.cookie("accessToken",this. accessToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });


       this. res.cookie("refreshToken",this. refreshToken, {
            httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
            maxAge: 7 * 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
        });

    }

 

    startSession() {


        /**
    * generate user session
    *
    */

        this.req.session.user = {
            _id: this.user._id,
            username: this.user.username,
            rol: this.user.rol,
            emial: this.user.email,
        };
    }



}