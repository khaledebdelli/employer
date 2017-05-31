/**
 * Created by ebdelli on 4/15/17.
 */
angular.module('routeApp')
    .controller('loginController', ['$scope', '$http', '$state','loginService','$window',
        function ($scope, $http, $state, loginService, $window) {
            $scope.user = {};
            $scope.submit = function () {
                loginService.submit($scope.user).then(() => {
                    $window.location.href = '/';
                }).catch(() => {
                    $scope.error = "L'adresse e-mail ou le mot de passe que vous avez entré n'est pas valide.";
                    $scope.$apply();
                })

            }
        }
    ])
    .controller('signupController', ['$scope', '$http',
        function ($scope, $http) {


        }
    ]);

