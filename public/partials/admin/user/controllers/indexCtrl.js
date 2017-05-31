
angular.module('routeApp') .controller('usersCtrl', ['$scope', 'content', '$filter', 'usersService', '$state', '$ngConfirm','$rootScope',
    function ($scope, content, $filter, usersService, $state, $ngConfirm, $rootScope) {

        $scope.users = {};
        let users = content.data;

        $rootScope.pagetitle = "Liste des utilisateurs";

        $scope.block = function(id) {
            return usersService.block(id).then((data) => {
                $state.reload();
            }).catch((data) => {
                $ngConfirm({
                    title: 'Avertissement',
                    content: '<b>Vous n\'êtes pas autorisé</b>',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Retour'
                        }
                    }
                });
            });
        };
        $scope.unblock = function(id) {
            return usersService.unblock(id).then((data) => {
                $state.reload();
            }).catch((data) => {
                $ngConfirm({
                    title: 'Avertissement',
                    content: '<b>Vous n\'êtes pas autorisé</b>',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        close: {
                            text: 'Retour'
                        }
                    }
                });
            });
        };

        if (users) {
            _.each(users, function (user, key) {
                user.createdAt = $filter('date')(user.createdAt, "yyyy/MM/dd @ HH:mm:ss");
                user.updatedAt = $filter('date')(user.updatedAt, "yyyy/MM/dd @ HH:mm:ss");

            });
            $scope.users = users;
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
    }
]);
