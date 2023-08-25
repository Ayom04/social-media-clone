const authentication = require('./authentication')
const models = require('../models/index')
const {unauthorisedAccess, serverError} = require('../constants/messages')


const authorization = async(req,res,next)=>{
    const userEmail = req.params.userEmail
    try {
        if(!userEmail)throw new Error(unauthorisedAccess)

        const userData = await models.Users.findOne({where: {email_address:userEmail}})
        if(!userData) throw new Error(unauthorisedAccess)
        
        req.params.email_address = userData.email_address
        next()   
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message || serverError
        })
    }
  
}
module.exports = authorization
