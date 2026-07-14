const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const auth = req.headers['authorization']
    if(!auth) {
        res.status(401).json({success: false, message: "Unauthorized user"})
    }
    try {
        const token = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = token
        next();
    } catch(err){
        res.status(500).json({success: false, message: "Token Expired."})
    }
}

module.exports = authMiddleware;