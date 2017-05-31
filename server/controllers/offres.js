/**
 * Created by ebdelli on 4/4/17.
 */
const Offre = require('../models').Offre;
const moment = require('moment');
module.exports = {
    create(req, res) {
        // console.log(req.body.resource);
        return Offre.create({
            datepublication: moment(req.body.datepublication, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            dateexpiration: moment(req.body.dateexpiration, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            titre: req.body.titre,
            libelle: req.body.libelle,
        })
            .then((offre) => res.status(200).send(offre))
            .catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return Offre
            .findAll({})
            .then((offre) => res.status(200).send(offre))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Offre
            .findById(req.params.offreId)
            .then((offre) => {
                if (!offre) {
                    return res.status(404).send({
                        message: 'Offre Not Found',
                    });
                }
                return res.status(200).send(offre);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Offre
            .findById(req.params.offreId)
            .then(offre => {
                if (!offre) {
                    return res.status(404).send({
                        message: 'Offre Not Found',
                    });
                }
                offre.update({
                    datepublication: moment(req.body.datepublication, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    dateexpiration: moment(req.body.dateexpiration, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    titre: req.body.titre,
                    libelle: req.body.libelle,
                })
                    .then((offre) => res.status(200).send(offre))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Offre
            .findById(req.params.offreId)
            .then(offre => {
                if (!offre) {
                    return res.status(400).send({
                        message: 'Offre Not Found',
                    });
                }
                return offre.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
