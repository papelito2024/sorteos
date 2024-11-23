import ExceptionHandler from "./exceptionHandler.js";

class AccessExceptions extends ExceptionHandler {
  constructor(error) {
    super(error);
  }

  access() {
    
    super.setErrorReponse({
      message: `${this.error.name} ${this.error.message}`,
      code: 401,
      type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
      errors: {
        email: "invalid credentials",
        password: "invalid credentials",
      },
    });
  }
}

export default AccessExceptions;
