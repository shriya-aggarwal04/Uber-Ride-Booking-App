const userModel = require('../models/user.model');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async(req, res, next) => {
    const token =req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    console.log(token);
    if(!token){
        return res.status(401).json({message : 'Unauthorized'});

    }
    const isBlacklisted = await blackListTokenModel.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await userModel.findById(decoded._id)
         console.log(user);
         req.user = user;

         return next();

    }catch (err){
        return res.status(401).json({message: 'Unauthorized user'});

    }
}

module.exports.authCaptain = async(req,res,next) => {
    const token = req.cookies.token||req.headers.authorization?.split(' ')[ 1 ];

    console.log(token);

    if(!token){
        return res.status(401).json({ message:'Unauthorized token'});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token:token});

    if(isBlacklisted) {
        return res.status(401).json( { message:'blacklisted token '})
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(" Decoded JWT:", decoded);
        const captain = await captainModel.findById(decoded._id)
        
        console.log(captain);

        req.captain = captain;

        if(!captain){
            console.log("Captain not found");
        }

        return next();

   }catch (err){
    console.log(err);
       return res.status(401).json({message:'Unauthorized captain'});

   } 
}