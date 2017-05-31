
angular.module('routeApp') .controller('offresCtrl', ['$scope', 'content', '$filter', '$rootScope', 'offreService', '$ngConfirm', '$state',
    function ($scope, content, $filter, $rootScope, offreService, $ngConfirm, $state) {

        $scope.offres = {};
        $rootScope.pagetitle = "Liste des offres";
        let offres = content.data;

        if (offres) {
            _.each(offres, function (annonce, key) {
                annonce.datepublication = $filter('date')(annonce.datepublication, "yyyy/MM/dd @ HH:mm:ss");
                annonce.dateexpiration = $filter('date')(annonce.dateexpiration, "yyyy/MM/dd @ HH:mm:ss");
                annonce.createdAt = $filter('date')(annonce.createdAt, "yyyy/MM/dd @ HH:mm:ss");
                annonce.updatedAt = $filter('date')(annonce.updatedAt, "yyyy/MM/dd @ HH:mm:ss");

            });
            $scope.offres = offres;
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
                title: 'Supprimez l\'annonce',
                content: '<strong>Etes-vous sûr de vouloir supprimer l\'annonce</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Supprimez',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            offreService.delete(id).then(function () {
                                $state.go('layout.offres',{},{reload:true});
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


        $scope.options = {
            10: 10,
            20: 20,
            50: 50
        };
    }
]);
