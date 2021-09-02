module.exports = (app, passport) => {

    const userController = require('../controllers/users.controller');
    var router = require("express").Router();
    const jwt = require('jsonwebtoken');

    router.post('/signup', userController.signup);

    router.post('/login',userController.login);
//you will be redirected to sign in with google page if you hit http://localhost:300/auth/google
    router.get("/google", passport.authenticate("google", {
        scope: ["email"], session: false
    }));
//this url will be called once google with authenticate the user successfully
    router.get("/google/redirect", passport.authenticate("google"), async (req, res) => {

        const accessToken = await jwt.sign({ email: req.user.email }, process.env.jwtSecret, { expiresIn: '1h' });
        res.send({ user: req.user.email, token: accessToken });
    });
    app.use('/auth', router);
};