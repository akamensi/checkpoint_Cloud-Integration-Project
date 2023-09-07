const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const User = require('../Models/User')


exports.Signup=async(req,res)=>{
    try {
        const {email,password} = req.body
        
        const found = await User.findOne({email})
        if(found){
            return res.status(400).send({error : [{msg : 'Email exist!'}]})
        }

        const newUser = new User(req.body)

        const salt = 10
        const hashpass = bcrypt.hashSync(password, salt)
        newUser.password = hashpass

        await newUser.save()

        const payload = { id : newUser._id }
        var token = jwt.sign(payload, process.env.privateKey, { expiresIn: '1h' })
        
        res.status(200).send({msg : 'Success', newUser, token})
    } catch (error) {
        res.status(500).send({error:[{msg : 'Could not singup'}]})
    }
}


exports.Signin=async(req,res)=>{
    try {
        const {email,password} = req.body
        const found = await User.findOne({email})
        if(!found){
            return res.status(400).send({error : [{msg:'Wrong email'}]})
        }
    
        const matched = bcrypt.compareSync(password,found.password )
        if (!matched ){
            return res.status(400).send({error:[{msg:'Could not connect'}]})
        }
    
    const payload = { id : found._id }
            var token = jwt.sign(payload, process.env.privateKey, { expiresIn: '1h' })
    
            res.status(200).send({msg : 'Seccuss', found, token})
    
    
    } catch (error) {
        res.status(500).send({error:[{msg : 'Could not singup'}]})
    }
    }