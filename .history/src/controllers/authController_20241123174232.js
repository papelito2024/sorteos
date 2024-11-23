import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import AuthExceptions from "../utils/exceptions/authExceptions.js";
import AuthError from "../utils/exceptions/customErrors/authError.js";
import Users from "../models/users.js";
import RegisterEmail from "../helpers/mail/register.js";
import TokenManager from "../utils/tokenManager/tokenManger.js";


class AuthController {
  
  constructor() {}

  async signin(req, res, next) {
    try {
      const user = await Users.findOne(
        { email: req.body.email },
        "_id username email rol valid avatar key password"
      );

      if (user === null) throw new AuthError("invalid credentias", "algo");

      if (!(await user.validatePassword(req.body.password)))
        throw new AuthError("invalid credentias");


      /**
       *  generate tokens
       * 
       * 
       */

      const tokenManager = new TokenManager()

      const accessToken = tokenManager.generateAccessToken({id:user._id})
      const refreshToken = tokenManager.generateRefreshToken({id:user._id})

      tokenManager.saveRefreshToken(user._id,refreshToken)

       res.cookie("accessToken", accessToken, {
         httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
         secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
         maxAge:15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
       });

       res.cookie("refreshToken", refreshToken, {
         httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
         secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
         maxAge:7*24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
       });
      

      // console.log(res.cookie.refreshToken)
      /**
       * generate user session
       * req.session.user = {
        _id: user._id,
        username: user.username,
        rol: user.rol,
        emial: user.email,
      };
       */

       
      res.status(200).json({
        status: "success",
        message: "logged  successfully",
        code: 200,
        data: {
          token: accessToken,
        },
      });

      // next();
    } catch (error) {
      const auth = new AuthExceptions(error);

      auth.handler();

      return res.status(401).json(auth.getErrorResponseFormat());
    }
  }

  async signup(req, res, next) {
    
    try {
      // console.log(req.body)
      const user = new Users(req.body);

     

      //send email

      /***
       *   

       *  send email
        * await  registerEmail({
          to:user.email,
          key:user.key,
          username:user.username,
          subject:"registration account verifing"
        })
            const email = new RegisterEmail({
        username:req.body.username,
        key:"Asdasdasdasdasdasd123123"
      });
      
      const info = await email.send({
        form: req.body.email,
        to: req.body.email,
        legend: "asdasd",
      });
        */

     
      const tokenManager = new TokenManager();

      const accessToken = tokenManager.generateAccessToken({ id: user._id });
      const refreshToken = tokenManager.generateRefreshToken({ id: user._id });

      tokenManager.saveRefreshToken(user._id, refreshToken);

      res.cookie("accessToken", accessToken, {
        httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
        secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
        maxAge: 15 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
        secure: process.env.NODE_ENV === "production", // Solo se enviará sobre HTTPS en producción
        maxAge: 7 * 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (en este caso, 15 minutos)
      });
      

       await user.save();


      res.cookies.accessToken = accessToken;

      //req.session.user=user;
      res.status(200).json({
        status: "success",
        message: "registeer user successfully",
        code: 200,
        data: {
          token: accessToken,
        },
      });

      
      //next();
    } catch (error) {

      console.log(error)

      return res.status(400).json({
        status: "error",
        code: 401,
        message: "validation error: invalid data recived",
        type: "",
        errors: {},
      });
    }
  }

  async signout(req, res, next) {
    if (req.session) req.session.destroy();

    if (res.cookie.accessToken) res.cookie.accessToken = null;

    return res.send("logout");
  }

  async forgotPassword(req, res, next) {
    //validar email
    if (req.body.email) {
     // console.log(req.body.email);
      req.session.email = req.body.email;
      //enveri email

      next();
    }

    if (req.body.password) {
      //update de userpassword
      try {
        //generate password hash
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        //update user password

        await Users.updateOne(
          { email: req.session.email },
          { password: password }
        );

        next();
      } catch (error) {
        //console.log(error);
        return res.status(400).send("error");
      }
    }
  }

  async verifyAccount(req, res, next) {
    if (!req.session.user.key == req.params.key) {
      res.send("invalid or corrupted verify token for validation ");
    } else {
      res.status(400).send("no guachin no me gustan las key corruptas");
    }
    next();
  }

  async refreshToken(req,res,next){

     const { refreshToken } = req.body;

     const tokenManager = new TokenManager()

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token no proporcionado' });
  }

  // Verificar si el refresh token es válido
  const userId = tokenManager.tokenService.verifyRefreshToken(refreshToken);
  if (!userId) {
    return res.status(403).json({ message: 'Refresh token inválido o expirado' });
  }

  // Buscar el refresh token en la base de datos
  const user = await Users.findUserById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(403).json({ message: 'Refresh token inválido' });
  }

  // Crear un nuevo access token
  const accessToken =tokenManager.generateAccessToken(user);

  res.json({
    accessToken,
  });

  }


 

}

export default AuthController;
