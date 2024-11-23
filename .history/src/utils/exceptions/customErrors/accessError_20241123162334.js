




class AccessError extends Error{

    constructor(code,message) {
        super(message)
        this.code
       this.name=" Access"
    }


    
}

export default  AccessError;