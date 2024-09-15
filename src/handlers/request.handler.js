const {validationResult} = require("express-validator")


const validate = (req, res, next)=>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(422).json({status: "fail", message: result.array()[0].msg})
    }
    next()
}


module.exports = {validate}