/**
 * Configuration du module principal : routeApp
 */
const myApp = angular.module('routeApp');
myApp.factory('authInterceptor', function ($q, $state, $rootScope) {
    return {
        responseError(response) {
            if (response.status === 401 || response.status === 403 || response.statusText === 'Internal Server Error') {
                $state.go('layout_l.login');
            }
            //console.log(response);
            return $q.reject(response);
        }
    };
}).config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
myApp.config(['$stateProvider', '$urlRouterProvider', 'CONSTANTS',
    function ($stateProvider, $urlRouterProvider, CONSTANTS) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('layout', {
                templateUrl: 'layouts/layout.html',
                controller: 'mainCtrl',
                resolve: {
                    user: function (Auth) {
                        return Auth.getUser();
                    }
                },
            })
            .state('layout_l', {
                templateUrl: 'layouts/layout_l.html',
            })
            .state('layout.home', {
                url: "/",
                views: {
                    'content': {
                        templateUrl: 'partials/home/views/index.html',
                        controller: 'homeCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html'
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'home';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Home')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout_l.login', {
                url: "/login",
                views: {
                    'content': {
                        templateUrl: 'partials/auth/views/login.html',
                        controller: 'loginController'
                    },
                },
                'acl': ['$q', 'AclService', function ($q, AclService) {
                    if (AclService.can('Login')) {
                        // Has proper permissions
                        return true;
                    } else {
                        // Does not have permission
                        return $q.reject('Unauthorized');
                    }
                }]
            })
            .state('layout_l.signup', {
                url: "/signup",
                views: {
                    'content': {
                        templateUrl: 'partials/auth/views/signup.html',
                        controller: 'signupController'
                    },
                }
            })

            .state('layout.leaves', {
                url: "/leaves",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/leave/views/index.html',
                        controller: 'leavesCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    content: function (leaveService) {
                        return leaveService.all();
                    },
                    activeRoute: function () {
                        return 'leaves';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Leaves')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.create_leaves', {
                url: "/leaves/create/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/leave/views/create.html',
                        controller: 'createLeaveCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'leaves';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Leaves')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.update_leaves', {
                url: "/leaves/update/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/leave/views/update.html',
                        controller: 'updateLeaveCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'leaves';
                    },
                    leave: function (leaveService, $stateParams) {
                        let id = $stateParams.id;
                        return leaveService.get(id);
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Leaves')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.employes', {
                url: "/employes",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/employe/views/index.html',
                        controller: 'employesCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    content: function (employeService) {
                        return employeService.all();
                    },
                    activeRoute: function () {
                        return 'employes';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Employes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.create_employes', {
                url: "/employes/create",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/employe/views/create.html',
                        controller: 'createEmployeCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'employes';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Employes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.update_employes', {
                url: "/employes/update/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/employe/views/update.html',
                        controller: 'updateEmployeCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'employes';
                    },
                    employe: function (employeService, $stateParams) {
                        let id = $stateParams.id;
                        return employeService.get(id);
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Employes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.users', {
                url: "/users",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/user/views/index.html',
                        controller: 'usersCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    content: function (usersService) {
                        return usersService.getUsers();
                    },
                    activeRoute: function () {
                        return 'users';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Users')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.create_users', {
                url: "/users/create",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/user/views/create.html',
                        controller: 'createUserCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'users';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Users')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })

            .state('layout.annonces', {
            url: "/annonces",
            views: {
                'content': {
                    templateUrl: 'partials/admin/annonce/views/index.html',
                    controller: 'annoncesCtrl',
                },
                'sidebar': {
                    templateUrl: 'partials/sidebar.html',
                    controller: 'sidebarCrtl',
                },
                'header': {
                    templateUrl: 'partials/header.html',
                    controller: 'headerCrtl',
                },
                'footer': {
                    templateUrl: 'partials/footer.html',
                }
            },
            resolve: {
                content: function (annonceService) {
                    return annonceService.all();
                },
                activeRoute: function () {
                    return 'annonces';
                },
                'acl': ['$q', 'AclService', function ($q, AclService) {
                    if (AclService.can('Annonces')) {
                        // Has proper permissions
                        return true;
                    } else {
                        // Does not have permission
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
            .state('layout.create_annonces', {
                url: "/annonces/create/",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/annonce/views/create.html',
                        controller: 'createAnnonceCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'annonces';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Leaves')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.update_annonces', {
                url: "/annonces/update/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/annonce/views/update.html',
                        controller: 'updateAnnonceCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'annonces';
                    },
                    annonce: function (annonceService, $stateParams) {
                        let id = $stateParams.id;
                        return annonceService.get(id);
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Annonces')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })

            .state('layout.offres', {
                url: "/offres",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/offre/views/index.html',
                        controller: 'offresCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    content: function (offreService) {
                        return offreService.all();
                    },
                    activeRoute: function () {
                        return 'offre';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Offres')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.create_offres', {
                url: "/offres/create",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/offre/views/create.html',
                        controller: 'createOffreCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'offres';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Offres')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.update_offres', {
                url: "/offres/update/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/offre/views/update.html',
                        controller: 'updateOffreCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'offres';
                    },
                    offre: function (offreService, $stateParams) {
                        let id = $stateParams.id;
                        return offreService.get(id);
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Offres')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })

            .state('layout.demandes', {
                url: "/demandes",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/demande/views/index.html',
                        controller: 'demandesCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    content: function (demandeService) {
                        return demandeService.all();
                    },
                    activeRoute: function () {
                        return 'demandes';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Demandes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.create_demandes', {
                url: "/demandes/create/",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/demande/views/create.html',
                        controller: 'createDemandeCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'demandes';
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Demandes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
            .state('layout.update_demandes', {
                url: "/demandes/update/{id}",
                views: {
                    'content': {
                        templateUrl: 'partials/admin/demande/views/update.html',
                        controller: 'updateDemandeCtrl',
                    },
                    'sidebar': {
                        templateUrl: 'partials/sidebar.html',
                        controller: 'sidebarCrtl',
                    },
                    'header': {
                        templateUrl: 'partials/header.html',
                        controller: 'headerCrtl',
                    },
                    'footer': {
                        templateUrl: 'partials/footer.html',
                    }
                },
                resolve: {
                    activeRoute: function () {
                        return 'demandes';
                    },
                    demande: function (demandeService, $stateParams) {
                        let id = $stateParams.id;
                        return demandeService.get(id);
                    },
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        if (AclService.can('Demandes')) {
                            // Has proper permissions
                            return true;
                        } else {
                            // Does not have permission
                            return $q.reject('Unauthorized');
                        }
                    }]
                }
            })
    }
]);


myApp.run(['AclService', 'Auth', '$http', function (AclService, Auth, $http) {
    //All these actions you also can do in the middle of app execution
    AclService.addRole('guest');
    AclService.addRole('employe', 'guest');
    AclService.addRole('admin', 'employe');

    AclService.addResource('Home');
    AclService.addResource('Users');
    AclService.addResource('Employes');
    AclService.addResource('Leaves');
    AclService.addResource('Login');
    AclService.addResource('Annonces');
    AclService.addResource('Offres');
    AclService.addResource('Demandes');


    /*  //Users can edit edit their own posts & view it because user inherits all guest permissions
     AclService.allow('user', 'Post', 'edit', function (role, resource, privilege) {
     return resource.authorId === role.id;
     });*/

    // imf access
    AclService.allow(Auth.getValue('user') ? Auth.getValue('user').role : "guest", Auth.getValue('user') ? Auth.getValue('user').resource : "Login");
    // AclService.allow('admin', Auth.getValue('user') ? Auth.getValue('user').resource : "Dashboard");
    AclService.allow('admin', 'Users');

    AclService.setUserIdentity({
        id: Auth.getValue('user') ? Auth.getValue('user').id : 0,
        firstname: Auth.getValue('user') ? Auth.getValue('user').firstname : 'guest',
        lastname: Auth.getValue('user') ? Auth.getValue('user').lastname : 'guest',
        email: Auth.getValue('user') ? Auth.getValue('user').email : 'guest',
        role: Auth.getValue('user') ? Auth.getValue('user').role : ['guest'],
        getRoles: function () {
            return this.role;
        }
    });
    //console.log(Auth.getValue('user').role);
}]);

myApp.run(function ($http, $rootScope, $state, Auth, $location) {
    // console.log($location.url());
    $rootScope.$on("$stateChangeStart", function (event, toState, next, nextParams, fromState) {

        $http({method: 'GET', url: 'api/me',})
            .then(function (data) {
                // event.preventDefault();
                Auth.setUser(data.data);
                // console.log(data.data.role);
            }).catch(function (data) {
            return data;
        });
        //console.log( Auth.getValue('user'));
    });
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'Unauthorized') {
            $state.go("layout_l.login");
        }
    });
});