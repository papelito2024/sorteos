import ExceptionHandler from "./exceptionHandler.js";

class AccessExceptions extends ExceptionHandler {
  constructor(error) {
    super(error);
  }

  access() {

    console.log(this.error)
    if (this.error.code == "SESSION_EXISITS") {
      this.setErrorReponse({
        message: `${this.error.name} ${this.error.message}`,
        code: 401,
        type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
        errors: {
         
        },
      });
    }


    if(this.error.code=="EXPIRED"){


         this.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {
            token:"expired"
           },
         });
    }
    if (this.error.code == "UNDEFINED") {

         this.setErrorReponse({
           message: `${this.error.name} ${this.error.message}`,
           code: 401,
           type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
           errors: {
             token: "undefined",
           },
         });
    }
    
   
  }
}

export default AccessExceptions;
