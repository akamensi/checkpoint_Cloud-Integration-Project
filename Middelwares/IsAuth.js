var jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.IsAuth=async(req,res,next)=>{
try {
    const token = req.header('Authorization')

    var decoded = jwt.verify(token, process.env.privateKey)
if(!decoded){
    return res.status(400).send({error:[{msg:"invalid token"}]})
}
const found = await User.findById(decoded.id)

req.user = found
next()


} catch (error) {
    res.status(500).send({msg : [{msg:'Could not'}]})
}
}