
 const db = require("../models");
 const bcrypt = require('bcrypt');
 const User = db.users;
 const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        const saltRounds = 10;
       //encrypt the password before saving it to database
        const hash = await bcrypt.hash(req.body.password, saltRounds);

        try {

            //check if user already exists
            let findUser = await User.findOne({ where: { email: req.body.email } });
            if (findUser)
                return res.status(409).send("this email already exists");

            let user = await User
                .create({
                    email: req.body.email,
                    password: hash,
                    strategy: 'local'
                })
            let token = await jwt.sign({ email: req.body.email }, process.env.jwtSecret, { expiresIn: '1h' });
            req.user = req.body.email;
            await res.status(201).send({user:req.body.email,token:token});
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

}

exports.login = async (req,res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        try {
            let findUser = await User.findOne({ where: { email: req.body.email, strategy: 'local' } });

            if (findUser === null) {
                res.status(404).send('User Not found!');
            }
           
            const passwd = await bcrypt.compare(req.body.password, findUser.password);
            
            if (passwd) {
                const accessToken = await jwt.sign({ email: req.body.email }, process.env.jwtSecret, { expiresIn: '1h' });
                req.user = req.body.email;
                await res.json({user:req.body.email,token:accessToken});
            }
            else {
                res.status(403).send("invalid password");
            }

        }
        catch (err) {
            res.status(500).send({
                message: "Error retrieving user with id=" + req.body.email
            });
        }
    } 
}