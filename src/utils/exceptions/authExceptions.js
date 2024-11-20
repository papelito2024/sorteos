const ErrorResponse = require("../../../http/reponse/ErrorResponse");

class AuthExceptions {
  constructor(error) {
    this.error = error;
    this.ErrResponse;
  }

  handler() {
    this.error.name = this.error.name ?? "App";

    switch (this.error.name) {
      case "Auth":
        this.errResponse = new ErrorResponse({
          message: `${this.error.name} ${this.error.message}`,
          code: 401,
          type: [process.env.HOSTNAME, "errors", this.error?.name].join("/"),
          errors: {
            email: "invalid credentials",
            password: "invalid credentials",
          },
        });

        var res = this.errResponse.getResponse();

        return res;

        break;

      case "Validation":
        this.errResponse = new ErrorResponse({
          message: `${this.error.name} ${this.error.message}`,
          code: 400,
          type: path.join(process.env.HOSTNAME, "errors", this.error?.name),
          errors: this.error.errors,
        });

        var res = this.errResponse.getResponse();

        return res;

        break;

      case "App":
        this.errResponse = new ErrorResponse({
          message: `Internal Application error`,
          code: 409,
          type: path.join(process.env.HOSTNAME, "errors", "application"),
          errors: {},
        });

        var res = this.errResponse.getResponse();

        return res;

        break;
    }

    return {
      status: 400,
      message: "unhandle error type ",
    };
  }
}

export default AuthException
