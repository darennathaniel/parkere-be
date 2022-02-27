const Joi = require('@hapi/joi')

const registerValidation = (data)=>{
    const schema = Joi.object({
        username : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;