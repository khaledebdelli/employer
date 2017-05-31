angular.module('routeApp')
    .controller('createLeaveCtrl', ['$scope', '$ngConfirm', 'leaveService', '$state', 'ngToast', '$stateParams', '$rootScope',
        function ($scope, $ngConfirm, leaveService, $state, ngToast, $stateParams, $rootScope) {
            $scope.leave = {employeId : $stateParams.id};
            $rootScope.pagetitle = "Creation d'un conjé";

            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un conjé',
                    content: '<b>Etes-vous sûr que vous voulez ajouter le conjé?</b>',
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
                                $state.go('layout.leaves');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                leaveService.create($scope.leave)
                                    .then((leave) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>Le conjé est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.leaves", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'attention',
                                        content: '<b>Erreur lors de l\'ajout du conjé</b>',
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