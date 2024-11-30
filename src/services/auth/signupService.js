
import Users from "../../models/users.js";

import AuthService from "./authServices.js";

export default class SignupService extends AuthService {

    constructor(req,res,body) {
        super(req,res)

        this.body = body
    }
 

    async saveUser() {
            /**
             * save the user in the database
             */

            const user = new Users(this.body)

            await user.save()

            /**
             * put the user in the locals to retrieve next middlewares
             */
            this.user=user

            return user
    }



    sendRegisterEmail(email, token, username) {

        /*
          signupService.sendEmail({
              email:user.email,
              token:user.tokens[0].token,
              username:user.usernmae
          }) */

    }




}











