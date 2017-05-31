/**
 * Created by ebdelli on 4/4/17.
 */
const Demande = require('../models').Demande;
const User = require('../models').User;
const moment = require('moment');
module.exports = {
    create(req, res) {
        // console.log(req.body.resource);
        return Demande.create({
            montant: req.body.montant,
            cause: req.body.cause,
            userId: req.user.id
        })
            .then((demande) => res.status(200).send(demande))
            .catch((error) => {
            console.log(error);
            res.status(400).send(error)
        });

    },

    list(req, res) {
        return Demande
            .findAll({
                include: [{
                    model: User,
                    as: 'user',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: User, as: 'user'}, 'createdAt', 'ASC'],
                ],
            })
            .then((demande) => res.status(200).send(demande))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Demande
            .findById(req.params.demandeId, {
                include: [{
                    model: User,
                    as: 'user',
                }]
            })
            .then((demande) => {
                if (!demande) {
                    return res.status(404).send({
                        message: 'Demande Not Found',
                    });
                }
                return res.status(200).send(demande);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Demande
            .findById(req.params.demandeId)
            .then(demande => {
                if (!demande) {
                    return res.status(404).send({
                        message: 'Demande Not Found',
                    });
                }
                demande.update(req.body, {fields: Object.keys(req.body)})
                    .then((demande) => res.status(200).send(demande))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    confirm(req, res) {
        return Demande
            .findById(req.params.demandeId)
            .then(demande => {
                if (!demande) {
                    return res.status(404).send({
                        message: 'Demande Not Found',
                    });
                }
                demande.update({decision: true})
                    .then((demande) => res.status(200).send(demande))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Demande
            .findById(req.params.demandeId)
            .then(demande => {
                if (!demande) {
                    return res.status(400).send({
                        message: 'Demande Not Found',
                    });
                }
                return demande.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
