
import ErrorResponse from "./response/errorResponse.js"

class ExceptionsHandler {
  
    constructor(error) {
        
        this.error = error;
        this.errorResponse;

    }


  getErrorResponseFormat(){
    return this.errorResponse.getResponse();
  }


  setErrorReponse(res){

    this.errorResponse = new ErrorResponse(res);

  }

  app(){
    this.errorResponse = new ErrorResponse({
      message: `Internal Application error`,
      code: 409,
      type: [process.env.HOSTNAME, "errors", "application"].join("/"),
      errors: {},
    });

  

  }




  validation() {
    this.errorResponse = new ErrorResponse({
      message: `${this.error.name} ${this.error.message}`,
      code: 400,
      type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
      errors: this.error.errors,
    });

 
  }
}

export default ExceptionsHandler;
