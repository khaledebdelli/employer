angular.module('routeApp')
    .controller('createUserCtrl', ['$scope', '$ngConfirm', 'usersService', '$state', 'ngToast', '$rootScope',
        function ($scope, $ngConfirm, usersService, $state, ngToast, $rootScope) {
            $scope.user = {};
            $rootScope.pagetitle = "Creation d'un utilisateur";

            $scope.resources = [
                {value: "Home", label: "Accueil"},
                {value: "Users", label: " Gestion Utilisateur"},
                {value: "Employes", label: "Employé"},
                {value: "Leaves", label: "Conjé"},
                {value: "Annonces", label: "Annonces"},
                {value: "Offres", label: "Offres"},
                {value: "Demandes", label: "Demandes"}
            ];
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'Ajouter un utilisateur',
                    content: '<b>Etes-vous sûr que vous voulez ajouter l\'utilisateur?</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Non',
                            action: function (scope, button) {
                                $ngConfirm('L\'inscription a été annulée ');
                            }
                        },
                        users: {
                            text: 'Retour',
                            btnClass: 'btn-dark',
                            action: function (scope, button) {
                                $state.go('layout.users');

                            }
                        },
                        ok: {
                            text: 'Confirmation',
                            btnClass: 'btn-green',
                            action: function () {
                                usersService.create($scope.user)
                                    .then((user) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>L\'utilisateur est ajouté avec succès</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.users", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'تنبيه',
                                        content: '<b>Erreur lors de l\'ajout de l\'utilisateur</b>',
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
