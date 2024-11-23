import jsonwebtoken  from "jsonwebtoken";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
import AccessError from "../../utils/exceptions/customErrors/accessError.js"
import AccessExceptions from "../../utils/exceptions/customErrors/accessError.js"
class Access {
  constructor() {
    this.req;
    this.res;
    this.token;
    this.userData;
  }

 
  
  access(privilege) {


    return async (req, res, next) => {
      this.req = req;
      this.res = res;
      this.token = this.getToken();
     

      try {
    
        this.userData = verify;

        if (privilege == "user") this.user() 

        if (privilege == "mod") if (!this.mod()) throw new Error(); //user

        if (privilege == "admin") if (!this.admin()) throw new Error();

        if (privilege == "guest") if (!this.guest()) throw new Error("you have already started a session");

        next();
      } catch (error) {
        
        error.name="ACCESS"
        console.log(error);
        res.status(401).send("access denied")
      }
    };
  }

  guest(){
    const accessToken=this.req.cookies.accessToken

    return accessToken!=null
  }

  async user() {
    
    const tokenManager = new TokenManager();

    const accessToken = this.req.cookies.accessToken;

    if(accessToken==null) return false
    
    const decoded = await tokenManager.verifyToken(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
    
    if(!decoded) throw new Error("access denied you must start a session");

    return decoded
  }

  mod() {
    return 
  }

  admin() {
    return 
  }


  
}

export default Access
