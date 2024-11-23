




class AccessError extends Error{

    constructor(message) {
        super(message)
        
       this.name=" Access"
    }


    
}

export default  AccessError;