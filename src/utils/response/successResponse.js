import Response from "./response.js"

class successResponse extends Response {
    constructor({ message, data={},code=200 }) {

        this.STATUS = "success"

        super({
            status: this.STATUS,
            message,
        });

        this.response.data = data
        this.response.statusCode = code ?? 200
    }




    getResponse() {
        console.log(this.response)
        return this.response
    }
}

export default ErrorResponse
