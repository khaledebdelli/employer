angular.module('routeApp')
    .controller('createAnnonceCtrl', ['$scope', '$ngConfirm', 'annonceService', '$state', 'ngToast', '$rootScope',
        function ($scope, $ngConfirm, annonceService, $state, ngToast, $rootScope) {
            $scope.annonce = {};
            $rootScope.pagetitle = "Creation des annonces";
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un annonce',
                    content: '<b>Etes-vous sûr que vous voulez ajouter l\'annonce?</b>',
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
                                $state.go('layout.annonces');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                annonceService.create($scope.annonce)
                                    .then((annonce) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>L\'annonce est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.annonces", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de l\'ajout de l\'annonce</b>',
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
