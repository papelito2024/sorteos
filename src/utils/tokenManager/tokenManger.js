
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


  generateAccessToken() {

    this.accessToken= jsonwebtoken.sign(
      { id : this.data._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }
    );

  
   // console.log(this.accessToken)
    return this.accessToken
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
  // console.log(this.refreshToken)
    return this.refreshToken
  }

  // Verificar un refresh token
  async verifyToken(token,secret) {
      const decoded = await jsonwebtoken.verify(token, secret);
     // console.log(decoded)
      return decoded;
    
  }

  async decodeToken(token,secret){

   
      const decoded = await jsonwebtoken.verify(token, secret);
      //console.log(decoded)

      
      return decoded.userId;
    
  }

  async saveRefreshToken (refreshToken) {
    const user = await Users.findOne({_id:this.data._id});
    if (user) {
       // console.log(user)

       if(user.tokens.find(t=>t.tokenType=="refresh")) return 


      user.tokens.push({
        tokenType:"refresh",
        token: refreshToken,
         
      }) 
      
      await user.save()
    }
  };


  
}


export default TokenManager