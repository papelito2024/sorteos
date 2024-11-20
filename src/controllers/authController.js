
import bcrypt from "bcrypt"
import jsonWebToken  from "jsonwebtoken";

class AuthController {
  constructor() {

  }

  async signin(req, res, next) {
    try {
      const user = await Users.findOne(
        { email: req.body.email },
        "_id username email rol valid avatar key password"
      );

      if (user === null) throw new AuthError("invalid credentias");

      if (!(await user.validatePassword(req.body.password)))
        throw new AuthError("invalid credentias");

      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          rol: user.rol,
          emial: user.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1800s" }
      );

      req.session.user = {
        _id: user._id,
        username: user.username,
        rol: user.rol,
        emial: user.email,
      };

      res.cookie.accessToken = accessToken;
      res.json({ accessToken });

      // next();
    } catch (error) {

      const authEx = new AuthExceptions(error);

      return res.status(401).json(authEx.handler());
    }
  }

  async signup(req, res, next) {
    try {
      req.body.chango = "Asdasd";
      const user = new Users(req.body);

      await user.save();

      //send email

      /*** send email
        * await  registerEmail({
          to:user.email,
          key:user.key,
          username:user.username,
          subject:"registration account verifing"
        })
        */

      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          rol: user.rol,
          emial: user.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1800s" }
      );

      //req.session.user=user;
      res
        .status(200)
        .json({
          operation: "successfull",
          msg: "registeer user successfully",
          accessToken,
        });
      //next();
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 401,
        message: "validation error: invalid data recived",
        type: "",
        errors: errors,
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
      console.log(req.body.email);
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
        console.log(error);
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
}

export default AuthController
