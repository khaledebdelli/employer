/**
 * Created by ebdelli on 4/4/17.
 */
const Annonce = require('../models').Annonce;
const moment = require('moment');
module.exports = {
    create(req, res) {
        // console.log(req.body.resource);
        return Annonce.create({
            datepublication: moment(req.body.datepublication, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            dateexpiration: moment(req.body.dateexpiration, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            titre: req.body.titre,
            libelle: req.body.libelle,
        })
            .then((annonce) => res.status(200).send(annonce))
            .catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return Annonce.findAll()
            .then((annonce) => res.status(200).send(annonce))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Annonce
            .findById(req.params.annonceId)
            .then((annonce) => {
                if (!annonce) {
                    return res.status(404).send({
                        message: 'Annonce Not Found',
                    });
                }
                return res.status(200).send(annonce);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Annonce
            .findById(req.params.annonceId)
            .then(annonce => {
                if (!annonce) {
                    return res.status(404).send({
                        message: 'Annonce Not Found',
                    });
                }
                annonce.update({
                    datepublication: moment(req.body.datepublication, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    dateexpiration: moment(req.body.dateexpiration, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    titre: req.body.titre,
                    libelle: req.body.libelle,
                })
                    .then((annonce) => res.status(200).send(annonce))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Annonce
            .findById(req.params.annonceId)
            .then(annonce => {
                if (!annonce) {
                    return res.status(400).send({
                        message: 'Annonce Not Found',
                    });
                }
                return annonce.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
