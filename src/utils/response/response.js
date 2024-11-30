class Response {
  constructor({ status, message }) {
    this.response = {
      status: status ?? 200,
      message: message ?? "respuesta recivida y procesada con exito",
    };
  }
}



export default Response