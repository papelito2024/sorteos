import Response from "./response.js"

class ErrorResponse extends Response {
  constructor({ message, errors, type, code }) {
    super({
      status: "error",
      message,
    });

    this.response.data = {
      errors: errors ?? {}
    }
    this.response.type = `${process.env.HOSTNAME}:${process.env.PORT}/errors/${type?? "application"}`
    this.response.statusCode = code ?? 400
  }


  

  getResponse() {
    console.log(this.response)
    return this.response
  }
}

export default ErrorResponse
