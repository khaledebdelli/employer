angular.module('routeApp')
    .controller('mainCtrl', ['$scope', '$rootScope', 'subMenuService', 'Auth', 'AclService',
        function ($scope, $rootScope, subMenuService, Auth, AclService) {
            $scope.can = AclService.can;
          //  $scope.user = Auth.getUser();
            //$scope.isAdmin = $scope.user.role == 'admin';
            $scope.$watch( Auth.isLoggedIn, function ( isLoggedIn ) {
                $scope.isLoggedIn = isLoggedIn;
               // $scope.user = Auth.getUser();
            });
            $rootScope.pagetitle = "Dashboard";
            $scope.submenu = subMenuService.submenu;
            $scope.showSubmenu = function () {
                $scope.submenu = subMenuService.toggle();
            };


            $scope.close_all = function () {
                subMenuService.close();
            }


        }
    ])

    .controller('sidebarCrtl', ['$scope', 'activeRoute', 'subMenuService', 'AclService', 'loginService', 'Auth',
        function ($scope, activeRoute, subMenuService, AclService, loginService, Auth) {
            $scope.logout = function () {
                loginService.logout();
            };
            $scope.can = AclService.can;
            $scope.routeName = activeRoute;
            $scope.submenu = subMenuService.submenu;
            $scope.showSubmenu = function () {
                $scope.submenu = subMenuService.toggle();
            };
            $scope.user = Auth.getValue('user');
            $scope.submenu2 = subMenuService.submenu2;
            $scope.showSubmenu2 = function () {
                $scope.submenu2 = subMenuService.toggle2();
            };

            $scope.submenu3 = subMenuService.submenu3;
            $scope.showSubmenu3 = function () {
                $scope.submenu3 = subMenuService.toggle3();
            };

            $scope.close_all = function () {
                subMenuService.close();
            }
        }

    ])
    .controller('headerCrtl', ['$scope', 'Auth','loginService',
        function ($scope, setting, Auth, loginService) {
         //   $scope.setting = setting.data;
         //   $scope.aside = {title: 'Title', content: 'Hello Aside<br />This is a multiline message!'};
            $scope.logout = function () {
                loginService.logout();
            };
           // $scope.user = Auth.getValue('user');
        }
    ]);
