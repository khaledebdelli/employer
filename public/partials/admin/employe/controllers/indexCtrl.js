
angular.module('routeApp') .controller('employesCtrl', ['$scope', 'content', '$filter', '$rootScope', 'employeService', '$ngConfirm', '$state',
    function ($scope, content, $filter, $rootScope, employeService, $ngConfirm, $state) {

        $scope.employes = {};
        $rootScope.pagetitle = "Liste des employés";
        let employes = content.data;

        if (employes) {
            _.each(employes, function (employe, key) {
                employe.createdAt = $filter('date')(employe.createdAt, "yyyy/MM/dd @ HH:mm:ss");
                employe.updatedAt = $filter('date')(employe.updatedAt, "yyyy/MM/dd @ HH:mm:ss");

            });
            $scope.employes = employes;
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
                title: 'Supprimez l\'employé',
                content: '<strong>Etes-vous sûr de vouloir supprimer l\'employé</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Supprimez',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            employeService.delete(id).then(function () {
                                $state.go('layout.employes',{},{reload:true});
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
