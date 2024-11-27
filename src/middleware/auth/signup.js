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


    /**
      *  generate tokens
      * 
      *  token manager logic access and refresh token
      */

    const tokenManager = new TokenManager(user)

    /**
    * initialize tokens 
    */
    tokenManager.init()

    await user.save();

    //req.session.user=user;
    res.status(200).json({
        status: "success",
        message: "registeer user successfully",
        code: 200,
        data: {
            token: accessToken,
        },
    });


}
catch (error) {

    /**
      * handle posibli exception errors
      */
    const auth = new AuthExceptions(error)

    auth.handler()

    return res.status(401).json(auth.getErrorResponseFormat())
}
  }