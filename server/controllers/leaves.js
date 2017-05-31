/**
 * Created by ebdelli on 4/4/17.
 */
const Leave = require('../models').Leave;
const Employe = require('../models').Employe;
const moment = require('moment');
module.exports = {
    create(req, res) {
        // console.log(req.body.resource);
        return Leave.create({
            begindate: moment(req.body.begindate, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            enddate: moment(req.body.enddate, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            type: req.body.type,
            employeId: req.body.employeId
        })
            .then((leave) => res.status(200).send(leave))
            .catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
        });

    },

    list(req, res) {
        return Leave
            .findAll({
                include: [{
                    model: Employe,
                    as: 'employe',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Employe, as: 'employe'}, 'createdAt', 'ASC'],
                ],
            })
            .then((leave) => res.status(200).send(leave))
            .catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Leave
            .findById(req.params.leaveId, {
                include: [{
                    model: Employe,
                    as: 'employe',
                }]
            })
            .then((leave) => {
                if (!leave) {
                    return res.status(404).send({
                        message: 'Leave Not Found',
                    });
                }
                return res.status(200).send(leave);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Leave
            .findById(req.params.leaveId)
            .then(leave => {
                if (!leave) {
                    return res.status(404).send({
                        message: 'Leave Not Found',
                    });
                }
                leave.update(req.body, {fields: Object.keys(req.body)})
                    .then((leave) => res.status(200).send(leave))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    confirm(req, res) {
        return Leave
            .findById(req.params.leaveId)
            .then(leave => {
                if (!leave) {
                    return res.status(404).send({
                        message: 'Leave Not Found',
                    });
                }
                leave.update({decision: true})
                    .then((leave) => res.status(200).send(leave))
                    .catch((error) => res.status(400).send(error));


            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Leave
            .findById(req.params.leaveId)
            .then(leave => {
                if (!leave) {
                    return res.status(400).send({
                        message: 'Leave Not Found',
                    });
                }
                return leave.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
