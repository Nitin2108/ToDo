const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
//fetch jwt token from header
    const header = req.headers['authorization'];
    let result = '';

    if (typeof header !== 'undefined') {

        const token = req.headers.authorization.split(' ')[1];
        result = jwt.verify(token,process.env.jwtSecret, (err, data) => {
            if (err)
                return res.status(401).send("Invalid token");
            let json = JSON.parse(JSON.stringify(data));
         //attach user details with req object if token is valid
            req.user = json.email;
           //pass the controller to next handler 
            return next();
        })

    }

    else {
        res.status(403).send("No token found");
    }


}