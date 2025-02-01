const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    // if (error) {
    //     return res.status(400)
    //     .json({
    //          message : "Bad request", 
    //          error:
    //         })
        
    // }
    if (error) {
        console.error('Validation error:', error.details[0].message); // Log the specific error
        return res.status(400).json({
            message: "Validation Error",
            error: error.details[0].message,
        });
    }
    
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
       
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    // if (error) {
    //     return res.status(400)
    //     .json({
    //          message : "Bad request", error
             
    //         });
        
    // }
    if (error) {
        console.error('Validation error:', error.details[0].message); // Log the specific error
        return res.status(400).json({
            message: "Validation Error",
            error: error.details[0].message,
        });
    }
    
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
