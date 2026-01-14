const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header.authorization;

    if(!authHeader){
        return res.status(401).json({error:"Token não fornecido"})
    }

    const part = authHeader.split(' ')
    const[schema, token] = part
    
    jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
        if(err) return res.status(401).json({err:"Token inválido"})

        req.userId = decoded.id;
        return next()
    });
};