angular.module('routeApp')
    .service('subMenuService', function () {
        this.submenu = false;
        this.toggle = function () {
            this.submenu = !this.submenu;
            this.submenu2 = false;
            this.submenu3 = false;
           return this.submenu;
        };

        this.submenu2 = false;
        this.toggle2 = function () {
            this.submenu2 = !this.submenu2;
            this.submenu = false;
            this.submenu3 = false;
            return this.submenu2;
        };

        this.submenu3 = false;
        this.toggle3 = function () {
            this.submenu3 = !this.submenu3;
            this.submenu = false;
            this.submenu2 = false;
            return this.submenu3;
        };

        this.close =function () {
            this.submenu = false;
            this.submenu2 = false;
            this.submenu3 = false;
        }
    })
    .factory('Auth', function($window){
        let user = {
            firstname: 'guest',
            lastname: 'gest',
            email:'gest@gest.com',
            role: ['guest', 'user'],
            getRoles: function () {
                return this.role;
            }
        };

        return {
            isLoggedIn : function(){
                return (user) ? user : false;
            },
            getUser: function(){
                return user;
            },
            destroyUser: function () {
                user = null;
            },
            isAdmin: function () {
                return user ? user.role[2] == 'admin' : false;
            },
            setValue : function (key, value) {
                let encryptedData = CryptoJS.AES.encrypt(angular.toJson(value), 'test').toString();
                $window.localStorage.setItem(key, encryptedData);
            },

            getValue : function (key) {
                let encryptedData = $window.localStorage.getItem(key);

                if (!_.isNull(encryptedData))
                    return angular.fromJson(CryptoJS.AES.decrypt(encryptedData, 'test').toString(CryptoJS.enc.Utf8));

                return null;
            }
        }
    })
    .service('loginService', function ($http, Auth, $state) {

            this.submit = function (data) {
                return new Promise((fullfil, reject)=>{
                    $http({
                        method: 'POST',
                        url: 'api/login',
                        data: data,
                    }).then(function (data) {
                        Auth.setValue('user',{
                            id: data.data.id,
                            firstname: data.data.firstname,
                            lastname: data.data.lastname,
                            email:data.data.email,
                            role: data.data.role,
                            resource: data.data.permission.resource
                        });
                        fullfil(data);
                    }).catch(function (data) {
                        reject(data);
                    })
                });

            };
            this.logout = function (data) {
                $http({
                    method: 'GET',
                    url: 'api/logout'
                }).then(function (data) {
                    Auth.setValue('user',{
                        id: 0,
                        firstname: 'guest',
                        lastname: 'guest',
                        email: 'guest@guest',
                        role: ['guest'],
                        resource: ['Login']
                    });
                    Auth.destroyUser();
                    $state.go('layout_l.login')
                })
            }
        }
    )
    .service('usersService', ['$http', function ($http) {
        this.getUsers = function () {
            return $http.get('api/users');
        };
        this.getUser = function (id) {
            return $http.get('api/users/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/users',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/users/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.changepassword = function (data) {
            return $http({
                method: 'PUT',
                url: 'api/changepassword/',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.block = function (id) {
            return $http.put('/api/users/block/'+id);
        };
        this.unblock = function (id) {
            return $http.put('/api/users/unblock/'+id);
        };
    }])
    .service('permissionService', ['$http', function ($http) {
    this.all = function () {
        return $http.get('api/permissions');
    };
    this.get = function (id) {
        return $http.get('api/permissions/'+id);
    };
    this.create = function (data) {
        return $http({
            method: 'POST',
            url: 'api/permissions',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    this.update = function (id, data) {
        return $http({
            method: 'PUT',
            url: 'api/permissions/'+id,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    this.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: 'api/permissions/'+id,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
}])
    .service('employeService', ['$http', function ($http) {
        this.all = function () {
            return $http.get('api/employes');
        };
        this.get = function (id) {
            return $http.get('api/employes/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/employes',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/employes/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: 'api/employes/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
    }])

    .service('leaveService', ['$http', function ($http) {
        this.all = function () {
            return $http.get('api/leaves');
        };
        this.get = function (id) {
            return $http.get('api/leaves/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/leaves',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/leaves/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.confirm = function (id) {
            return $http({
                method: 'PUT',
                url: 'api/leaves/confirm/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: 'api/leaves/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
    }])


    .service('annonceService', ['$http', function ($http) {
        this.all = function () {
            return $http.get('api/annonces');
        };
        this.get = function (id) {
            return $http.get('api/annonces/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/annonces',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/annonces/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: 'api/annonces/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
    }])


    .service('offreService', ['$http', function ($http) {
        this.all = function () {
            return $http.get('api/offres');
        };
        this.get = function (id) {
            return $http.get('api/offres/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/offres',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/offres/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: 'api/offres/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
    }])
    .service('demandeService', ['$http', function ($http) {
        this.all = function () {
            return $http.get('api/demandes');
        };
        this.get = function (id) {
            return $http.get('api/demandes/'+id);
        };
        this.create = function (data) {
            return $http({
                method: 'POST',
                url: 'api/demandes',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: 'api/demandes/'+id,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.confirm = function (id) {
            return $http({
                method: 'PUT',
                url: 'api/demandes/confirm/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: 'api/demandes/'+id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
    }]);
