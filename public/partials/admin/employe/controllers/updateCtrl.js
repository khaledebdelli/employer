angular.module('routeApp')
    .controller('updateEmployeCtrl', ['$scope', '$ngConfirm', 'employeService', '$state', 'ngToast', '$stateParams', 'employe',
        function ($scope, $ngConfirm, employeService, $state, ngToast, $stateParams, employe) {
            $scope.employe = employe.data;

            $scope.update = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un employé',
                    content: '<b>Etes-vous sûr que vous voulez modifier l\'employé?</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Non',
                            action: function (scope, button) {
                                $ngConfirm('La modification a été annulée ');
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
                                employeService.update($stateParams.id , $scope.employe)
                                    .then((user) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>L\'employé est modifié avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.employes", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de modification de l\'employé</b>',
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
