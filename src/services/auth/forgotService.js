import Users from "../../models/users.js"



export default class ForgotService {



    constructor(parameters) {
        
    }





 checkKey (key)  {
 
        if (!key) throw new Error("key doenst eixst bitches")


}



 async resend ({key,email}) {

       
        /**
         * get the user
         */

        const user = await Users.findOne({ email: email })


        const token = await user.generateToken({ type: "forgot", key: "forgotemail", expiration: new Date.now() + (1000 * 60 * 15) })


        /***
        *  send email
        */

        await resetPasswordEmail({
            to: email,
            key: token,
            username: username,
            subject: "reset password petition"
        })

        /**
         *  set a session variable to retrieve the email from the user in the next step
         */

        req.session.email = email

       

}




 async checkTokens  ({email,key}) {

        if (!email) throw new Error("session token expired restart the operation");
        /**
         * get the user from the database
         */
       

        const user = await Users.findOne({ email: email })

        /**
         * get and compare  the forgot token
         */

        const token = user.tokens.find(token => token.tokenType = "forgot")

        if (token.expire >= Date.now()) throw new Error("invalid token or expired restart the operation");
        if (key != token) throw new Error("invalid token or expired restart the operation");

   


}




async resetPassword ({password,email}) {

        /**
         * check for the new password
         */

      

        if (!password) throw new Error(" you need to fill the password field");


        /**
         * if is ok then get the user generate the new hash password and  update the user 
         */

     

        if (!email) throw new Error("session token expired restart the operation");


        const user = await Users.find({ email: email })

        if (user) throw new Error("session token expired restart the operation");

        const hash = await user.generateHash(password)


        user.password = hash


        await user.save()


        /**
         * if ok send success response to the client
         */


        return res.status(201).json({
            status: "success",
            message: "your password has been reset successfully",

        })




   


}


}