
import nodemailer from "nodemailer"

class Mailer {

    constructor(config) {
       
      console.log(config.host ?? process.env.MAIL_HOSTNAME);
      this.config = {
        host: config.host ?? process.env.MAIL_HOSTNAME,
        port: config.port ?? process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE ?? false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAIL_USERNAME,
          pass:process.env.MAIL_PASSWORD,
        },
      };
           
       try {
          /** 
             * connection to mail server object 
            */
         //  console.log(process.env)
           this.transporter = nodemailer.createTransport(this.config);
        

        } catch (error) {
            
            
            console.log(error)
            
        }
    }



 

  async send(params){
    
    const legend = params.lengend ?? "fantasma qlau 👻";

    //const from =this.setFrom(params.from.email) || this.user;

    //const to = this.setTo(to || this.user);

    const subject = params.subject ?? "this is a mail from sorteos";
  
      return  await this.transporter.sendMail({
        from: ''+legend+' <'+params.from+'>', // sender address
        to: params.to, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: this.createHTMLBody(this.htmlBody), // html body
      });


  }


 createHTMLBody(body){

    return  `
      <header >
        logo titulo de la wwwwwea
      </header>
      ${body}
     <footer >
        logo titulo de la wwwwwea
      </footer>
      
    `;

    
  }

   setFrom(from){
    if(!validator.validate(from)) throw new Error(`${from} ${this.errMsg.FORMAT}`);
    return from;
  }

  setTo(to){
    

    if(typeof to == "Array"){
      to.forEach((email)=>{
        if(!validator.validate(email)) throw new Error(`${email} ${this.errMsg.FORMAT}`);
      })
      return to.join(",")
    }
      
    
    if(!validator.validate(to)) throw new Error(`${to} ${this.errMsg.FORMAT}`);

    return to;
  }

  createTextBody(body){

    this.textBody = `
     
      titulo de ltu hermana
      ${body}

      pie de pagina
    `;

    
  }
}





export default Mailer