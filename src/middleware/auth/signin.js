


const signInMiddlewares =[]


try {

    /**
     * validate user access and return otherwise throw an exception
     */
    const user = userAccessValidate();

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



    /**
     * generate user session
     *
     */

    req.session.user = {
        _id: user._id,
        username: user.username,
        rol: user.rol,
        emial: user.email,
    };

    /**
    * response 
    */
    res.status(200).json({
        status: "success",
        message: "logged  successfully",
        code: 200,
        data: {
            token: accessToken,
        },
    });


} catch (error) {
    /**
     * handle posibli exception errors
     */
    const auth = new AuthExceptions(error)

    auth.handler()

    return res.status(401).json(auth.getErrorResponseFormat())
}


export default signInMiddlewares