angular.module('routeApp')
    .controller('createOffreCtrl', ['$scope', '$ngConfirm', 'offreService', '$state', 'ngToast', '$rootScope',
        function ($scope, $ngConfirm, offreService, $state, ngToast, $rootScope) {
            $scope.offre = {};
            $rootScope.pagetitle = "Liste des offres";

            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un offre',
                    content: '<b>Etes-vous sûr que vous voulez ajouter l\'offre?</b>',
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
                                $state.go('layout.offres');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                offreService.create($scope.offre)
                                    .then((offre) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>L\'offre est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.offres", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de l\'ajout de l\'offre</b>',
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
