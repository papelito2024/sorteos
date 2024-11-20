import Response from "./response.js"

class ErrorResponse extends Response {
  constructor({ message, errors, type, code }) {
    super({
      status: "error",
      message,
    });

    this.response.errors = errors ?? {};
    this.response.type = type ?? "";
    this.response.code = code ?? 400;
  }

  getResponse() {
    console.log(this.response);
    return this.response;
  }
}

export default ErrorResponse
