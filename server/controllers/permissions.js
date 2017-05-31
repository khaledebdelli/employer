/**
 * Created by ebdelli on 4/4/17.
 */
const User = require('../models').User;
const Permission = require('../models').Permission;
module.exports = {
    create(req, res) {
       // console.log(req.body.resource);
        return Permission.create(req.body, {fields: Object.keys(req.body)})
            .then((permission) => res.status(200).send(permission))
            .catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return Permission
            .findAll({
                include: [{
                    model: User,
                    as: 'users',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: User, as: 'users'}, 'createdAt', 'ASC'],
                ],
            })
            .then((permission) => res.status(200).send(permission))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Permission
            .findById(req.params.permissionId, {
                include: [{
                    model: User,
                    as: 'users',
                }]
            })
            .then((permission) => {
                if (!permission) {
                    return res.status(404).send({
                        message: 'Permission Not Found',
                    });
                }
                return res.status(200).send(permission);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Permission
            .findById(req.params.permissionId)
            .then(permission => {
                if (!permission) {
                    return res.status(404).send({
                        message: 'Permission Not Found',
                    });
                }
                permission.update(req.body, {fields: Object.keys(req.body)})
                    .then((permission) => res.status(200).send(permission))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Permission
            .findById(req.params.permissionId)
            .then(permission => {
                if (!permission) {
                    return res.status(400).send({
                        message: 'Permission Not Found',
                    });
                }
                return permission.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
