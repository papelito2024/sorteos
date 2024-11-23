import ExceptionHandler from "./exceptionHandler.js";

class AccessExceptions extends ExceptionHandler {
  constructor(error) {
    super(error);
  }

  access() {

    if(this.code=="EXPIRED"){
         super.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {},
         });
    }
    if (this.code == "UNDEFINED") {

         super.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {},
         });
    }
    
   
  }
}

export default AccessExceptions;
