// Makes it such that only user's which are signed up and logged in can do tasks
// Used in routers/blogPostRoutes.js

const protect = (req, res, next) => {
    const {user} = req.session

    if(!user){
        return res.status(404).json({status: "fail", message: "unauthorized XX"})
    }

    req.user = user
    next()
}

module.exports = protect