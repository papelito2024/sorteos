import ExceptionHandler from "./exceptionHandler.js";

class AccessExceptions extends ExceptionHandler {
  constructor(error) {
    super(error);
  }

  access() {

    if(this.code=="EXPIRED"){
         this.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {},
         });
    }
    if (this.code == "UNDEFINED") {

         this.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {},
         });
    }
    
   
  }
}

export default AccessExceptions;
