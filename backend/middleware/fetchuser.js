const jwt = require('jsonwebtoken');

const Jwt_Secret = "baluisagoodboy$12";

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    // const token=req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).send({error: "please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, Jwt_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "please authenticate using a valid token"});
    }
}

module.exports = fetchuser;