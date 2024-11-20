
class Controller {
  constructor() {
    this.response = {};
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
}

export default Controller
