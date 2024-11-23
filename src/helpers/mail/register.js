import Mailer from "../../services/mailer/mailer.js";


class RegisterEmail extends Mailer{
  constructor(params) {
    super({})
   
   
   // this.htmlBody = this.createBody(params.username,params.key)
   
  }

  createBody(username, key) {
    return  `

    <h1>WELCOME ${username} HIJO D P</h1>
    <p>para activar tu cuenta hace click aca gil <a href="http:localhost:3000/auth/activate/${key}"> aca gil<a/>
    
    `;
  }



}



export default RegisterEmail


