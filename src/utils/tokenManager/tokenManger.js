
import jsonwebtoken from "jsonwebtoken"
import Users from "../../models/users.js";
class TokenManager {

  constructor(data) {

    /**
     * @param data
     *  token payload
     */

    this.data = data

    /**
     * @param accessToken
     *  
     */
    this.accessToken=""

    /**
    * @param refreshToken 
    */
    this.refreshToken = ""

  }

  init(){

    this.generateAccessToken()

    this.generateRefreshToken()

    this.saveRefreshToken()

    this.setCookieAccessToken();

    this.setCookieRefreshToken();

  }

  generateAccessToken() {
    this.accessToken= jsonwebtoken.sign(
      { id : this.data._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    return 
  }
  
  setCookieAccessToken(){
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
      maxAge: 15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
    });

  }

  setCookieRefreshToken() {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
      maxAge: 7 * 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
    });

  }

  // Generar un refresh token
  generateRefreshToken() {
    this.refreshToken= jsonwebtoken.sign(
      { id: this.data._id },
      process.env.JWT_TOKEN_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_TOKEN_REFRESH_EXPIRES_IN,
      }
    );
  }

  // Verificar un refresh token
  async verifyToken(token,secret) {
    try {
      const decoded = await jsonwebtoken.verify(token, secret);
      console.log(decoded)
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }

  async decodeToken(token,secret){

   
      const decoded = await jsonwebtoken.verify(token, secret);
      //console.log(decoded)

      
      return decoded.userId;
    
  }

  async saveRefreshToken (userId, refreshToken) {
    const user = await Users.findOne({_id:this.data._id});
    if (user) {
       // console.log(user)
      user.tokens.push({
        tokenType:"refresh",
        token: refreshToken,
        
      }) 
      
      await user.save()
    }
  };


  
}


export default TokenManager