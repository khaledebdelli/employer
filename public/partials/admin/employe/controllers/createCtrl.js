angular.module('routeApp')
    .controller('createEmployeCtrl', ['$scope', '$ngConfirm', 'employeService', '$state', 'ngToast', '$rootScope',
        function ($scope, $ngConfirm, employeService, $state, ngToast, $rootScope) {
            $scope.employe = {};
            $rootScope.pagetitle = "Creation d'un employé";
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un employé',
                    content: '<b>Etes-vous sûr que vous voulez ajouter l\'employé?</b>',
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
                                $state.go('layout.employes');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                employeService.create($scope.employe)
                                    .then((employe) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>L\'employé est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.employes", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de l\'ajout de l\'employé</b>',
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
