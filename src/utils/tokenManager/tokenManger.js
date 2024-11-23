
import jsonwebtoken from "jsonwebtoken"
import Users from "../../models/users.js";
class TokenManager {

  constructor(parameters) {

    this.accessToken=""
    this.refreshToken=""

  }

  generateAccessToken(user) {
    return jsonwebtoken.sign(
      { userId: user.id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }
    );
  }

  // Generar un refresh token
  generateRefreshToken(user) {
    return jsonwebtoken.sign(
      { userId: user.id },
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

  async saveRefreshToken (userId, refreshToken) {
    const user = await Users.findOne({_id:userId});
    if (user) {
       // console.log(user)
      user.refreshToken = refreshToken;
      
      await user.save()
    }
  };
}


export default TokenManager