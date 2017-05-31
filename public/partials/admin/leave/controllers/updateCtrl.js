angular.module('routeApp')
    .controller('updateLeaveCtrl', ['$scope', '$ngConfirm', 'leaveService', '$state', 'ngToast', '$stateParams','leave', '$filter',
        function ($scope, $ngConfirm, leaveService, $state, ngToast, $stateParams, leave, $filter) {
            $scope.leave = leave.data;

            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un conjé',
                    content: '<b>Etes-vous sûr que vous voulez modifier le conjé?</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Non',
                            action: function (scope, button) {
                                $ngConfirm('Modification annulée ');
                            }
                        },
                        users: {
                            text: 'Retour',
                            btnClass: 'btn-dark',
                            action: function (scope, button) {
                                $state.go('layout.leaves');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                leaveService.update($stateParams.id, $scope.leave)
                                    .then((leave) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>Le conjé est modifier avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.leaves", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de modification du conjé</b>',
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