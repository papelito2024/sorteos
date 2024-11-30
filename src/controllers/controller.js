
class Controller {
  constructor(req,res) {
    this.req=req

    this.res=res

  }

  setReponse(...ob) {
    this.response = {
      type: path.join(process.env.HOSTNAME, type ?? "apidoc"),
      detail: detail ?? "",
      status: status ?? 200,
      errors: errors ?? {},
    };
  }


  

  async get(params, pagination = {}) {
    let result = null;
    try {
      if (pagination)
        pagination.skip = pagination.limit * (pagination.page - 1);

      result = await Sorteos.find(params, pagination);

      return result;
    } catch (error) {
      result = {
        error: "error qlo",
      };
    }
  }


  createCookie({
    name,
    data,
    options
  }) {


   this. res.cookie("accessToken", accessToken, {
      httpOnly:options.httpOnly?? process.env.ENV == "production", // La cookie no es accesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
      maxAge:options.maxAge??  15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
    });
  }
}

export default Controller
