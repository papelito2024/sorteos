

import Users from "../../models/users.js";
import AuthExceptions from "../../utils/exceptions/authExceptions.js";
import AuthError from "../../utils/exceptions/customErrors/authError.js";
import TokenManager from "../../utils/tokenManager/tokenManger.js";
import AuthService from "./authServices.js";
 



export default class signinService extends AuthService {
    constructor(req,res,body) {
        super(req,res)
        this.user = body
    }



    async validateAccess(){


        const user = await Users.findOne(
            { email: this.user.email },
            "_id username email rol valid avatar key password"
        );
       

        if (user === null) throw new AuthError("invalid credentias")
        
        if (!(await user.validatePassword(this.user.password)))
            throw new AuthError("invalid credentias")

        this.user= user

        return user;
    }



}