const asyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken')


const authMiddleware=asyncHandler((req,res,next)=>{
    const authHeader=req.headers.authorization
    const token=authHeader.split(' ')[1]
    if(!token){
        throw new BadRequest('No token found')
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const {userId}=decoded
    req.userId={userId}
    next()
}
)
module.exports=authMiddleware