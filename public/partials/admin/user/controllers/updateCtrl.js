angular.module('routeApp')
    .controller('updateUserCtrl', ['$scope', '$ngConfirm', 'usersService', '$state', 'ngToast', '$stateParams', 'user',
        function ($scope, $ngConfirm, usersService, $state, ngToast, $stateParams, user) {

            $scope.keepoldpass = false;
            $scope.togglekeepoldpass = function () {
                $scope.keepoldpass = !$scope.keepoldpass;
                $scope.user.password = '';
            };
            $scope.user = user.data;
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'تحديث المستعمل',
                    content: '<b>هل أنت متأكد من تحديث المعلومات ؟</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'تأكيد',
                            btnClass: 'btn-orange',
                            action: function () {
                                usersService.update($stateParams.id ,$scope.user)
                                    .then((user) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>لقد تم تحديث معلومات المستعمل بنجاح</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.users", {}, {reload: true});
                                    }).catch((error) => {
                                    $ngConfirm({
                                        title: 'تنبيه',
                                        content: '<b> حدث خطأ في تحديث المعلومات </b>',
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            close: {
                                                text: 'رجوع'
                                            }
                                        }
                                    });
                                })

                            }

                        },
                        folders: {
                            text: 'الرجوع إلى لائحة المستعملين',
                            btnClass: 'btn-dark',
                            action: function (scope, button) {
                                $state.go('layout.users');

                            }
                        },
                        close: {
                            text: 'لا',
                            action: function (scope, button) {
                                $ngConfirm('لقد تم إلغاء التحديث ');
                            }
                        }
                    }
                });
            };


            $scope.cancel = function () {
                $state.reload();
            }

        }
    ]);;
