import Users from "../../models/users.js"

export function  userAccessValidate(email,password){


        const user = await Users.findOne(
        { email: req.body.email },
        "_id username email rol valid avatar key password"
      );

      if (user === null) throw new AuthError("invalid credentias", "algo");

      if (!(await user.validatePassword(req.body.password)))
        throw new AuthError("invalid credentias");


}