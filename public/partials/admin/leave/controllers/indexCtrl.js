
angular.module('routeApp') .controller('leavesCtrl', ['$scope', 'content', '$filter', 'leaveService', '$state', '$ngConfirm', '$rootScope',
    function ($scope, content, $filter, leaveService, $state, $ngConfirm, $rootScope) {

        $scope.leaves = {};
        let leaves = content.data;
        $rootScope.pagetitle = "Liste des conjés";
        if (leaves) {
            _.each(leaves, function (leave, key) {
                leave.begindate = $filter('date')(leave.begindate, "yyyy/MM/dd @ HH:mm:ss");
                leave.enddate = $filter('date')(leave.enddate, "yyyy/MM/dd @ HH:mm:ss");
                leave.createdAt = $filter('date')(leave.createdAt, "yyyy/MM/dd @ HH:mm:ss");
                leave.updatedAt = $filter('date')(leave.updatedAt, "yyyy/MM/dd @ HH:mm:ss");

            });
            $scope.leaves = leaves;
        }
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };


        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.search2 = '';


        $scope.options = {
            10: 10,
            20: 20,
            50: 50
        };


        $scope.delete = function (id) {
            $ngConfirm({
                title: 'Supprimez le conjé',
                content: '<strong>Etes-vous sûr de vouloir supprimer le conjé</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Supprimez',
                        btnClass: 'btn-red',
                        action: function (scope, button) {
                            leaveService.delete(id).then(function () {
                                $state.go('layout.leaves',{},{reload:true});
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
                title: 'Confirmer le conjé',
                content: '<strong>Etes-vous sûr de vouloir Confirmer le conjé</strong>',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    delete: {
                        text: 'Confirmer',
                        btnClass: 'btn-black',
                        action: function (scope, button) {
                            leaveService.confirm(id).then(function () {
                                $state.go('layout.leaves',{},{reload:true});
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
    }
]);
