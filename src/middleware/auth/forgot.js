import Users from "../../models/users.js"
import resetPasswordEmail from "../../helpers/mail/resetPasowrd.js"

const forgotMiddlewares = []


const checkKey = (req, res, next) => {
    try {
        if (!req.params.key) throw new Error("key doenst eixst bitches")



    } catch (error) {

        return res.status(401).json({
            status: "error",
            message: error.message,
            code: error.name
        })
    }

}

const resend = async (req, res, next) => {

    try {

        if (!req.params.key == "send") next();

   
        /**
         * get email from the body equest
         */
        const email =  req.body.email

        /**
         * get the user
         */

        const user = await Users.findOne({ email: email })

        
        const key =await  user.generateToken({ type: "forgot", key:"forgotemail", expiration: new Date.now() + (1000 * 60 * 15) })

        
        /***
        *  send email
        */

        await resetPasswordEmail({
            to: user.email,
            key: key,
            username: user.username,
            subject: "reset password petition"
        })

        /**
         *  set a session variable to retrieve the email from the user in the next step
         */

        req.session.email=email

        /**
         * send the response to the client
         */

        return res.status(201).json({
            status: "success",
            messagge: "email sended succesfully",

        })

    } catch (error) {

        return res.status(401).json({
            status: "error",
            message: error.message,
            code: error.name
        })
    }

}

forgotMiddlewares.push(checkKey)



const checkTokens=async (req,res,next)=>{
    try {

        /**
         * retrieve the email from the session if not the session is expired
         */
        const email = req.session.email
        
        if(!email) throw new Error("session token expired restart the operation");
        /**
         * get the user from the database
         */
        const key = req.params.key

        const user =await  Users.findOne({email:email})

        /**
         * get and compare  the forgot token
         */

        const token = user.tokens.find(token=>token.tokenType="forgot")
        
        if (token.expire >= Date.now()) throw new Error("invalid token or expired restart the operation");
        if(key!=token) throw new Error("invalid token or expired restart the operation");
        
        /**
         * if everyting okay
         * go next middleware
         */

        next()

    } catch (error) {
        
        return res.status(403).json({
            status:"error",
            message:error.message,
            code:error.name
        })
    }
    

}


forgotMiddlewares.push(checkTokens)



const resetPassword=async (req,res,next)=>{

    try {

        /**
         * check for the new password
         */
        
        const passowrd = req.body.password

        if (!password) throw new Error(" you need to fill the password field");
        
            
        /**
         * if is ok then get the user generate the new hash password and  update the user 
         */   

        const email = req.session.email

        if (!email) throw new Error("session token expired restart the operation");


        const user = await Users.find({email:email})

        if (user) throw new Error("session token expired restart the operation");

        const hash = await  user.generateHash(password)


        user.password = hash


        await user.save()


        /**
         * if ok send success response to the client
         */

        
        return res.status(201).json({
            status: "success",
            message: "your password has been reset successfully",
           
        }) 

           
           
        
    } catch (error) {
        return res.status(403).json({
            status: "error",
            message: error.message,
            code: error.name
        })
        
    }
   
    
}




forgotMiddlewares.push(resetPassword)

export default forgotMiddlewares