const { body , validationResult } = require('express-validator')

exports.validSignup = [
    body('email','Emaill is not valid').isEmail(),
    body('password','weak password, min 6 char').isLength(6)
]

exports.validSignIn = [
    body("email", "Please enter a email").isEmail()
]

exports.validation=(req,res,next)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }

    next()
}