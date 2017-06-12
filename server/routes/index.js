/**
 * Created by ebdelli on 4/4/17.
 */
const express = require('express');
const router = express.Router();
const isGranted = require('./../config/authenticated').isGranted;
const isLoggedIn = require('./../config/authenticated').isLoggedIn;

//controllers

const usersController = require('../controllers').users;
const permissionsController = require('../controllers').permissions;
const employesController = require('../controllers').employes;
const leavesController = require('../controllers').leaves;
const offresController = require('../controllers').offres;
const annoncesController = require('../controllers').annonces;
const demandesController = require('../controllers').demandes;

module.exports = (router, passport) => {

    // On our router variable, we'll be able to include various methods. For our app we'll only make use of GET requests, so the method router.get will handle that interaction. This method takes a string as its first parameter and that is the url path, so for the first route we are just giving it '/', which means the default route. Next we are defining a Node Js callback function, that takes three parameters, a request (req), a response (res), and an optional next (next) parameter. Finally, in our callback function, we are just send the message "You are on the homepage".
    router.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));



    router.post('/api/users',isGranted('Users'), usersController.create);
    router.get('/api/users',isGranted('Users') , usersController.list);
    router.get('/api/users/:userId',isGranted('Users') , usersController.retrieve);
    router.put('/api/users/:userId',isGranted('Users') , usersController.update);
    router.delete('/api/users/:userId',isGranted('Users') , usersController.destroy);
    router.put('/api/users/block/:userId',isGranted('Users') , usersController.block);
    router.put('/api/users/unblock/:userId',isGranted('Users') , usersController.unblock);
    router.put('/api/changepassword',isGranted('Users'), usersController.changepassword);


    //permissions
    router.post('/api/permissions',isGranted('Users'), permissionsController.create);
    router.get('/api/permissions',isGranted('Users') , permissionsController.list);
    router.get('/api/permissions/:permissionId',isGranted('Users') , permissionsController.retrieve);
    router.put('/api/permissions/:permissionId',isGranted('Users') , permissionsController.update);
    router.delete('/api/permissions/:permissionId',isGranted('Users') , permissionsController.destroy);


    //employes
    router.post('/api/employes',isGranted('Employes'), employesController.create);
    router.get('/api/employes',isGranted('Employes') , employesController.list);
    router.get('/api/employes/:employeId',isGranted('Employes') , employesController.retrieve);
    router.put('/api/employes/:employeId',isGranted('Employes') , employesController.update);
    router.delete('/api/employes/:employeId',isGranted('Employes') , employesController.destroy);

    //leaves
    router.post('/api/leaves',isGranted('Leaves'), leavesController.create);
    router.get('/api/leaves',isGranted('Leaves') , leavesController.list);
    router.get('/api/leaves/:leaveId',isGranted('Leaves') , leavesController.retrieve);
    router.put('/api/leaves/:leaveId',isGranted('Leaves') , leavesController.update);
    router.put('/api/leaves/confirm/:leaveId',isGranted('Leaves') , leavesController.confirm);
    router.delete('/api/leaves/:leaveId',isGranted('Leaves') , leavesController.destroy);


    //annonces
    router.post('/api/annonces',isGranted('Annonces'), annoncesController.create);
    router.get('/api/annonces',isGranted('Annonces') , annoncesController.list);
    router.get('/api/annonces/:annonceId',isGranted('Annonces') , annoncesController.retrieve);
    router.put('/api/annonces/:annonceId',isGranted('Annonces') , annoncesController.update);
    router.delete('/api/annonces/:annonceId',isGranted('Annonces') , annoncesController.destroy);


    //offres
    router.post('/api/offres',isGranted('Offres'), offresController.create);
    router.get('/api/offres',isGranted('Offres') , offresController.list);
    router.get('/api/offres/:offreId',isGranted('Offres') , offresController.retrieve);
    router.put('/api/offres/:offreId',isGranted('Offres') , offresController.update);
    router.delete('/api/offres/:offreId',isGranted('Offres') , offresController.destroy);


    //demandes
    router.post('/api/demandes',isGranted('Demandes'), demandesController.create);
    router.get('/api/demandes',isGranted('Demandes') , demandesController.list);
    router.get('/api/demandes/:demandeId',isGranted('Demandes') , demandesController.retrieve);
    router.put('/api/demandes/:demandeId',isGranted('Demandes') , demandesController.update);
    router.put('/api/demandes/confirm/:demandeId',isGranted('Demandes') , demandesController.confirm);
    router.delete('/api/demandes/:demandeId',isGranted('Demandes') , demandesController.destroy);


//router.post('/api/login', authController.login);
    router.post('/api/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send(info);
            }
            req.logIn(user, err => {
                if (err)
                    return res.status(401);
                //console.log(user);
                res.status(200).send(user);
            });
        })(req, res, next)
    });

    router.get('/api/me', (req, res) => {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
    router.get('/api/logout', (req, res) => {
        try {
            req.logout();
            res.status(200).send("Logout success");
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    });




};


