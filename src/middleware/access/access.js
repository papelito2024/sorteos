import jsonwebtoken  from "jsonwebtoken";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
import AccessError from "../../utils/exceptions/customErrors/accessError.js"
import AccessExceptions from "../../utils/exceptions/accessException.js"

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
        if (privilege == "user")this.decoded= await  this.user() 

        if (privilege == "mod")this.decoded = await this.mod()

        if (privilege == "admin")this.decoded=await  this.admin()

        if (privilege == "guest")this.guest()

          console.log("asdasd")
         next();

      } catch (error) {
        
        console.log("Asdasd1111")
       const access= new AccessExceptions(error)
       //
       access.handler()
    
       return  res.status(401).json(access.getErrorResponseFormat())
      }
    };
  }

  guest(){
    const accessToken=this.req.cookies.accessToken

    if (accessToken != null)throw new  AccessError("SESSION_EXISITS","you have already started a session")

  }

  async user() {
    
    const tokenManager = new TokenManager({});

    const accessToken = this.req.cookies.accessToken;
   // console.log(this.req.cookies)

    //console.log(accessToken)

    if(!accessToken) throw new AccessError("UNDEFINED","access denied you must start a session")
    
    const decoded = await tokenManager.verifyToken(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
   
    if(!decoded) throw new AccessError("EXPIRED"," error invalid broken or expired  access token")

    return decoded
  }

  mod() {

    console.log("mod")
    const decoded = this.user()
    console.log("out user")

    if(decoded.rol == "user")  throw new AccessError(
      "UNAUTHORIZED",
      "access denied you dont have permissions for this resoruce"
    );
    
    console.log("asda")
    return decoded
  }

  admin() {
      const decoded = this.user();

      if (decoded.rol != "admin")
        throw new AccessError(
          "UNAUTHORIZED",
          "access denied you dont have permissions for this resoruce"
        );

      return decOded;
  }


  
}

export default Access
