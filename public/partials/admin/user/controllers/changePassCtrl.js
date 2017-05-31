angular.module('routeApp')
    .controller('changePasswordCtrl', ['$scope', '$ngConfirm', 'usersService', '$state', 'ngToast',
        function ($scope, $ngConfirm, usersService, $state, ngToast) {


            $scope.user = {};
            $scope.send = function (isValid) {
                $ngConfirm({
                    title: 'تحديث كلمة المرور',
                    content: '<b>هل أنت متأكد من تحديث كلمة المرور ؟</b>',
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'تأكيد',
                            btnClass: 'btn-green',
                            action: function () {
                                usersService.changepassword($scope.user)
                                    .then((user) => {
                                        ngToast.create({
                                            className: 'success',
                                            content: '<div class="h3"><div>لقد تم تحديث كلمة المرور بنجاح</div>',
                                            timeout: 3000
                                        });
                                        $state.go("layout.home");
                                    }).catch((error) => {
                                    console.log(error);
                                    $ngConfirm({
                                        title: 'تنبيه',
                                        content: '<b> الرجاء التأكد من كلمة المرور السابقة </b>',
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
    ]);
