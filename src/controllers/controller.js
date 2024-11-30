import Users from "../models/users"


class Controller {
  constructor(req,res) {
    this.req=req

    this.res=res

    this.auth
  }


  async getUser() {
    const user = await Users.findOne({ email: this.user.email })

    this.user = user
  }

  setAuthenticatedUser(){
    
      if(!this.req.cookies.accessToken) throw new Error("not authenticated user")

      
  }
  
  getAuthenticatedUer(){

    return this.auth.isAuthenticated ? this.auth.user : false
  }
  
  isAuthenticated(){
    
    return !this.req.cookies.accessToken ? false : true 
  }


  successResponse(){


  }


  errorResponse(){

    
  }

  

  

  async get(params, pagination = {}) {
    let result = null;
    try {
      if (pagination)
        pagination.skip = pagination.limit * (pagination.page - 1);

      result = await Sorteos.find(params, pagination);

      return result;
    } catch (error) {
      result = {
        error: "error qlo",
      };
    }
  }


  createCookie({
    name,
    data,
    options
  }) {


   this. res.cookie("accessToken", accessToken, {
      httpOnly:options.httpOnly?? process.env.ENV == "production", // La cookie no es accesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
      maxAge:options.maxAge??  15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
    });
  }
}

export default Controller
