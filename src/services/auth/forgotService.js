import Users from "../../models/users.js"
import AuthService from "./authServices.js"
import ResetPasswordEmail from "../../helpers/mail/resetPasowrd.js"


export default class ForgotService extends AuthService{



    constructor(req,res,{key,email,password}) {
        super(req,res)

        this.user={
            email:email?? undefined,
            password:password ?? undefined
        }

        this.key = key


        this.token
    }


    

    async sendEmail(token){
        
        const resetMail= new ResetPasswrodEmail(this.user.username, this.token)
        
        const res= await resetMail.send({
            to: this.user.email,
            key: token,
            username: this.user.username,
            subject: "reset password petition"
        })
    }








 async checkTokens  () {


        

        const user = this.getUserFromToken()

        /**
         * get and compare  the forgot token
         */

        const token = user.tokens.find(token => token.tokenType = "forgot")

        

        if (token.expire >= Date.now()) throw new Error("invalid token or expired restart the operation");
        if (key != token) throw new Error("invalid token or expired restart the operation");

        
        user.tokens.filter(token => token.tokenType != "forgot")

        user.save()


}




async resetPassword () {



        const user = await this.getUserFromToken()
        const hash = await user.generateHash(password)


        user.password = hash


        await user.save()



}


}