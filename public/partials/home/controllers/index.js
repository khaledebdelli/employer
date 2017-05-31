angular.module('routeApp').controller('homeCtrl', ['$scope', '$http', 'employeService', 'leaveService', 'annonceService', 'offreService',
    function ($scope, $http, employeService, leaveService, annonceService, offreService) {

     employeService.all().then((employes) => {
         $scope.employes = employes.data.length;

    });
     leaveService.all().then((leaves) => {
         $scope.leaves = leaves.data.length;

    });
     annonceService.all().then((annonces) => {
         $scope.annonces = annonces.data.length;

    });
     offreService.all().then((offres) => {
         $scope.offres = offres.data.length;

    });

    }
]);
