const LocalStrategy = require("passport-local").Strategy;
const Permission = require('../models').Permission;
const User = require('./../models').User;
const md5 = require('md5');


module.exports = (passport) => {

    passport.use(new LocalStrategy((username, password, done) => {

        User.findOne({where: {email: username}, include: [{
            model: Permission,
            as: 'permission',
        }]
        })
            .then((data) => {
                if (!data) {
                    done(null, false, { message: 'Incorrect username.' });
                } else {
                    let user = data;
                    if (user.password === md5(password))
                        done(null, user);
                    else
                        done(null, false, {message: 'Incorrect password.'});
                }
            })
            .catch(err => {
                console.log(err);
                done(err)
            });
    }));

    passport.serializeUser((user, done) => {
        console.log("serialize");
        done(null, user.email);
    });
    passport.deserializeUser((userToken, done) => {
        User.findOne({where: {email: userToken}})
            .then((user) => done(null, user))
            .catch((error) => done(error));
    });

};