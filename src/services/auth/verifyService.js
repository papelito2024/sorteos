import TokenManager from "../../utils/tokenManager/tokenManger.js"
import Users from "../../models/users.js"
import RegisterEmail from "../../helpers/mail/register.js"



export default class verifyService {
    constructor(parameters) {
        
    }


checkKey  (req, res, next) {
 
        if (!req.params.key) throw new Error("key doenst eixst bitches");


}


async resend  ({access}) {

       // if (!req.params.key == "resend") next();

        /**
         * access token needed only a logged user can askt for a new email for verify account
         */
      //  const access = req.cookies.access
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET
        const token = new TokenManager({})
        /**
         * decodde  the token to get the data
         */
        const { _id, email } = token.decodeToken(access, secret)

        /**
         * get the user
         */
        const user = await Users.findOne({ _id: _id })

        const key = user.generateToken({ type: "verify", key: _id, expiration: new Date.now() + (1000 * 60 * 60 * 24) })

        /***
        *  send email
        */
        await registerEmail({
            to: user.email,
            key: key,
            username: user.username,
            subject: "registration account verifing"
        })

     

   

}



 async verify  ({key,access}) {
 
        
        /*  *
         * get the user via access token
         * */
       // const access = req.cookies.access

        const secret = process.env.JWT_ACCESS_TOKEN_SECRET
        const token = new TokenManager({})
        const { _id, email } = token.decodeToken(access, secret)


        /**
         * get the key from the db
         */

        const user = await Users.findOne({ _id: _id, "tokens.tokenType": "verify" })

        const userKey = user.tokens.find(token => token.type)

        /**
         * check expiration 
         */
        if (userKey.expire < Date.now()) throw new Error("verify account token corrupt or expired ");
        /**
         * compare each key if they match
         */

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
        return res.status(201).json({
            status: "sucess",
            message: "account verified successfully"
        })

   

    }
}