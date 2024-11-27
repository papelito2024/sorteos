
  async signout(req, res, next) {

    if (req.session.user) req.session.destroy()

    if (res.cookies.accessToken) res.clearCookie("accessToken")
    if (res.cookies.accessToken) res.clearCookie("refreshToken")

    return res.status(200).json({
        status: "success",
        message: "you have close your session successfully",

    })
}