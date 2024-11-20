




class AuthError extends Error{

    constructor(message) {
        super(message)
        
       this.name="Auth"
    }


    getResponse(){
        console.log("asdasd")
    }
}

export default AuthError;