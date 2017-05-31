/**
 * Created by ebdelli on 4/4/17.
 */
const User = require('../models').User;
const Permission = require('../models').Permission;
const md5 = require('md5');
module.exports = {
    create(req, res) {
        console.log(req.body.resource);
        return Permission.create({
                resource: req.body.resource,
                role:  req.body.role
            }).then((permission) => {
                User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        role: req.body.role,
                        password: md5(req.body.password),
                        permissionId : permission.id
                    })
                    .then((user) => res.status(200).send(user))
                    .catch((error) => {
                    console.log(error.message);
                    res.status(400).send(error.message)
                });
            }).catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return User
            .findAll({
                attributes: { exclude: ['password'] },
                include: [{
                    model: Permission,
                    as: 'permission',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Permission, as: 'permission'}, 'createdAt', 'ASC'],
                ],
            })
            .then((users) => res.status(200).send(users))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return User
            .findById(req.params.userId, {
                attributes: { exclude: ['password'] },
                include: [{
                    model: Permission,
                    as: 'permission',
                }]
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                if (req.body.keepoldpass){
                    user.update({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        role: [req.body.role],
                    }).then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send(error));
                } else {
                    user.update({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        role: [req.body.role],
                        password: md5(req.body.password)
                    })
                        .then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send(error));
                }

            })
            .catch((error) => res.status(400).send(error));
    },
    changepassword(req, res) {
        return User
            .findById(req.user.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                if (md5(req.body.oldpassword) == user.password){
                    user.update({
                        password: md5(req.body.newpassword)
                        })
                        .then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send(error));
                } else {
                    res.status(400).send(error)
                }

            })
            .catch((error) => res.status(400).send(error));
    },
    block(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                if (user.id == req.user.id || req.user.role[0] !== 'admin' ) {
                    return res.sendStatus(400);
                }
                return user
                    .update({active: false})
                    .then(() => res.status(200).send('user blocked'))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    unblock(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                if (user.id == req.user.id || req.user.role[0] !== 'admin' ) {
                    return res.sendStatus(400);
                }
                return user
                    .update({active: true})
                    .then(() => res.status(200).send('user active'))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
