//middleware
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        const token = req.header('auth-token')
        if(!token) throw Error ("access denied")
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified) throw Error ("invalid token")
        req.user = verified
    }catch(err){
        res.status(400).json({
            message: err.message,
            data: [],
            error: true})
    }
    next() 
}