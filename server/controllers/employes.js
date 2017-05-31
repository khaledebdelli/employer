/**
 * Created by ebdelli on 4/4/17.
 */
const Leave = require('../models').Leave;
const Employe = require('../models').Employe;
module.exports = {
    create(req, res) {
       // console.log(req.body.resource);
        return Employe.create(req.body, {fields: Object.keys(req.body)})
            .then((employe) => res.status(200).send(employe))
            .catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return Employe
            .findAll({
                include: [{
                    model: Leave,
                    as: 'leaves',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Leave, as: 'leaves'}, 'createdAt', 'ASC'],
                ],
            })
            .then((employe) => res.status(200).send(employe))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Employe
            .findById(req.params.employeId, {
                include: [{
                    model: Leave,
                    as: 'leaves',
                }]
            })
            .then((employe) => {
                if (!employe) {
                    return res.status(404).send({
                        message: 'Employe Not Found',
                    });
                }
                return res.status(200).send(employe);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Employe
            .findById(req.params.employeId)
            .then(employe => {
                if (!employe) {
                    return res.status(404).send({
                        message: 'Employe Not Found',
                    });
                }
                employe.update(req.body, {fields: Object.keys(req.body)})
                    .then((employe) => res.status(200).send(employe))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Employe
            .findById(req.params.employeId)
            .then(employe => {
                if (!employe) {
                    return res.status(400).send({
                        message: 'Employe Not Found',
                    });
                }
                return employe.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
