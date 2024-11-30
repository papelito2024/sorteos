import Mailer from "../../utils/mailer/mailer.js";


class ResetPasswordEmail extends Mailer {
    constructor({username,key}) {
        super({})


        // this.htmlBody = this.createBody(params.username,params.key)

    }

    createBody() {
        return `

    <h1hola ${this.username} HIJO D P</h1>
    <p>You asked a petition for reseting your password if it wasnt you pls be aware somebody try to fuck you
    </p>
    <p>go to tehe next link to change your password  <a href="http://${process.env.HOSTNAME}/auth/forgot/${this.key}"> aca gil<a/>
    
    `;
    }



}



export default ResetPasswordEmail


