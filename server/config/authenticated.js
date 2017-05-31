const User = require('./../models').User;
const Permission = require('./../models').Permission;


const isLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) res.sendStatus(401);
    else next();
};

const isGranted = function(resource) {
   return function (req, res, next) {
       //let user = serializer.serialize(req.user);
       //console.log(user);
       let perm;
       Permission.findById(req.user.permissionId).then((permission) => {
           let permissionJson = permission.toJSON();
           perm = permissionJson.resource.indexOf(resource) > -1 ;
           console.log(permissionJson.resource);
           console.log(resource +":"+perm);
       });

        if ( !req.isAuthenticated() || perm == false ) res.sendStatus(401);
        else next();
    }
};
module.exports = {
    isLoggedIn: isLoggedIn,
    isGranted: isGranted
};