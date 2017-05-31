angular.module('routeApp')
    .controller('createDemandeCtrl', ['$scope', '$ngConfirm', 'demandeService', '$state', 'ngToast', '$rootScope',
        function ($scope, $ngConfirm, demandeService, $state, ngToast, $rootScope) {
            $scope.demande = {};
            $rootScope.pagetitle = "Creation des demandes";
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un demande',
                    content: '<b>Etes-vous sûr que vous voulez ajouter la demande?</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Non',
                            action: function (scope, button) {
                                $ngConfirm('L\'ajout a été annulée ');
                            }
                        },
                        users: {
                            text: 'Retour',
                            btnClass: 'btn-dark',
                            action: function (scope, button) {
                                $state.go('layout.demandes');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                demandeService.create($scope.demande)
                                    .then((demande) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>La demande est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.demandes", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de l\'ajout de la demande</b>',
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            close: {
                                                text: 'Retour'
                                            }
                                        }
                                    });
                                })

                            }

                        }
                    }
                });
            };


            $scope.cancel = function () {
                $state.reload();
            }

        }
    ]);
