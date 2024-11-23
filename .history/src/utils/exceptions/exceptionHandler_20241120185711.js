import ErrorResponse from "./response/errorResponse.js";

class ExceptionsHandler {
  constructor(error) {
    this.error = error;
    this.errorResponse;

    this.customErrors=[
        "Auth",
        "Validation",
        
    ]
  }

  handler() {

   
    if(this.customErrors.includes(this.error.name)) return  this[this.error.name.toLowerCase()]();


    return this.app() 
  }

  getErrorResponseFormat() {
    return this.errorResponse.getResponse();
  }

  setErrorReponse(res) {
    this.errorResponse = new ErrorResponse(res);
  }

  app() {
    console.log(this.error)
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
