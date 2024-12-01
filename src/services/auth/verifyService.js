import TokenManager from "../../utils/tokenManager/tokenManger.js"
import Users from "../../models/users.js"
import RegisterEmail from "../../helpers/mail/register.js"
import AuthService from "./authServices.js"



export default class verifyService extends AuthService{
    constructor(req,res) {
        super(req,res)
    }





async resend  () {


        /**
         * access token needed only a logged user can askt for a new email for verify account
         */
      
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET
        const token = new TokenManager({})

        
        const user =await  this.getUserFromToken()

        console.log(user)

        const key = await user.generateToken({ type: "verify", key:user._id.toString(), expiration:  Date.now() + (1000 * 60 * 60 * 24) })

        console.log(key)
        /***
        *  send email
        */
      /*  await registerEmail({
            to: user.email,
            key: key,
            username: user.username,
            subject: "registration account verifing"
        })*/

     

   

}



 async checkTokens  (key) {
 
        
        /*  *
         * get the user via access token
         * */
       // const access = req.cookies.access

        const secret = process.env.JWT_ACCESS_TOKEN_SECRET
        const token = new TokenManager({})


     const user =await  this.getUserFromToken()


        /**
         * get the key from the db
         */

      

        const userKey = user.tokens.find(token => token.tokenType == "verify")

        console.log(userKey)

        /**
         * check expiration 
         */
        if (Date(userKey.expire) < Date.now()) throw new Error("verify account token corrupt or expired ");
        /**
         * compare each key if they match
         */  

        console.log(key)
        console.log(userKey.token)
        if (key != userKey.token) throw new Error("verify account token corrupt or expired ");


        /**
         *  update the user data with valid
         */

        user.verified = true
        user.tokens.filter(token => token.tokenType != "verify")
        await user.save()


        /**
         * send the succes message to the client
         */
      
   

    }
}