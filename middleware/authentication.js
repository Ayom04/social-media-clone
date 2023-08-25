const jwt = require('jsonwebtoken')
require('dotenv').config()
const {unauthorisedAccess, serverError} = require('../constants/messages')


const authentication = (req,res,next) =>{
    const {authorization} = req.headers

    try {
        if(!authorization)throw new Error(unauthorisedAccess)

        const tokenSplit = authorization.split(' ')

        jwt.verify(tokenSplit[1], process.env.JWT_SECRET, (err, decoded) =>{
            if(err)throw new Error(unauthorisedAccess)

            req.params.userEmail = decoded.email

            next()

        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message || serverError
        })
    }
}
module.exports = authentication