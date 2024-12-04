import Users from "../models/users.js"


class Controller {


  constructor() {
    
  } 


  
  setCookie({key,data,expriration}){

      

    this.res.cookie(key, data, {

      /**
       * default value false for development 
       */
      httpOnly: this.isProductionMode, 

      /**
       * default value false por development
       */
      secure: this.isProductionMode, 
      
      /**
       * default value for cookies 1 day of expiration
       */
      maxAge:expiration ?? 24 * 60 * 60 * 1000, 
    });
    
  }
  

  

  async get(filter, pagination = {}) {
    let result = null;
    
      if (pagination)  pagination.skip = pagination.limit * (pagination.page - 1);

      result = await Sorteos.find(filter, pagination);

      return result;
    
  }


}

export default Controller
