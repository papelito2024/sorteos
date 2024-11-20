
import ExceptionHandler from "./exceptionHandler.js"


class AuthExceptions extends ExceptionHandler {
  constructor(error) {
    super(error)

   
  }

  handler() {
    
    if(this.error.name=="Auth") return this.auth()

      
    return this[this.error.name.toLowerCase()]()
  }

  auth() {

  
      this.setErrorResponse({
      message: `${super.error.name} ${super.error.message}`,
      code: 401,
      type: [process.env.HOSTNAME, "errors", super.error?.name].join("/"),
      errors: {
        email: "invalid credentials",
        password: "invalid credentials",
      },
    })

    
  }
}

export default AuthExceptions
