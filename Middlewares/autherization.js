const jwt = require("jsonwebtoken");
require("dotenv").config();


const authorised = (req, res, next)=>{
const token = req.headers?.authorization.split(" ")[1]

if(token){
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        
        if(decoded){
           req.body.userID = decoded.userID
            next()
        }else{
            res.send({err:"login first"})
        }
      });
}else{
    res.send({err:"login first"})
}
}


module.exports = {authorised}