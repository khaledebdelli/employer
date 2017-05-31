
angular.module('routeApp') .controller('demandesCtrl', ['$scope', 'content', '$filter', '$rootScope', 'demandeService', '$ngConfirm', '$state',
    function ($scope, content, $filter, $rootScope, demandeService, $ngConfirm, $state) {

        $scope.demandes = {};
        $rootScope.pagetitle = "Liste des demandes d'avance";
        let demandes = content.data;

        if (demandes) {
            _.each(demandes, function (demande, key) {
                demande.createdAt = $filter('date')(demande.createdAt, "yyyy/MM/dd @ HH:mm:ss");
                demande.updatedAt = $filter('date')(demande.updatedAt, "yyyy/MM/dd @ HH:mm:ss");

            });
            $scope.demandes = demandes;
        }

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };


        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.search2 = '';


        $scope.delete = function (id) {
            $ngConfirm({
                title: 'Supprimez la demande',
                content: '<strong>Etes-vous sûr de vouloir supprimer la demande</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Supprimez',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            demandeService.delete(id).then(function () {
                                $state.go('layout.demandes',{},{reload:true});
                            });
                        }
                    },
                    close: {
                        text: 'Annuler',
                        action: function (scope, button) {
                            $ngConfirm('La suppression a été annulée');
                        }
                    },
                }
            });
        };

        $scope.confirm = function (id) {
            $ngConfirm({
                title: 'Confirmer la demande',
                content: '<strong>Etes-vous sûr de vouloir Confirmer la demande</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Confirmer',
                        btnClass: 'btn-black',
                        action: function (scope, button) {
                            demandeService.confirm(id).then(function () {
                                $state.go('layout.demandes',{},{reload:true});
                            });
                        }
                    },
                    close: {
                        text: 'Annuler',
                        action: function (scope, button) {
                            $ngConfirm('La confirmation a été annulée');
                        }
                    },
                }
            });
        };
        $scope.options = {
            10: 10,
            20: 20,
            50: 50
        };
    }
]);
