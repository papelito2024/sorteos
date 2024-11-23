import jsonwebtoken  from "jsonwebtoken";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
import AccessError from "../../utils/exceptions/customErrors/accessError.js"
import AccessExceptions from "../../utils/exceptions/customErrors/accessError.js"

class Access {
  constructor() {
    this.req;
    this.res;
    this.token;
    this.decoded;
  }

 
  
  access(privilege) {


    return async (req, res, next) => {
      this.req = req;
      this.res = res;

      try {
    
       

        if (privilege == "user")this.decoded=  this.user() 

        if (privilege == "mod")this.decoded = this.mod()

        if (privilege == "admin")this.decoded= this.admin()

        if (privilege == "guest")this.guest()
        next();
      } catch (error) {
        
       const accessException= new AccessExceptions(error)
       accessException.handler()
        res.status(401).json(accessException.getErrorResponseFormat())
      }
    };
  }

  guest(){
    const accessToken=this.req.cookies.accessToken

    if (accessToken != null)throw new Error("you have already started a session")

  }

  async user() {
    
    const tokenManager = new TokenManager();

    const accessToken = this.req.cookies.accessToken;

    if(accessToken==null) throw new AccessError("UNDEFINED","access denied you must start a session");
    
    const decoded = await tokenManager.verifyToken(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
    
    if(!decoded) throw new AccessError("EXPIRED"," error invalid broken or expired  access token");

    return decoded
  }

  mod() {


    const decoded = this.user()

    if(decoded.rol == "user")  throw new AccessError(
      "UNAUTHORIZED",
      "access denied you dont have permissions for this resoruce"
    );
    
    return decided
  }

  admin() {
    return 
  }


  
}

export default Access
