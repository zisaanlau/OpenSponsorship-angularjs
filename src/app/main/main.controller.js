export class MainController {
  constructor($scope, $http) {
    "ngInject";
    $scope.shown = { show: false };
    $scope.editing = { editing: false };
    $scope.users = [];

    $scope.formParams = {};

    this.$onInit = () => {
      $scope.getUser();
    };

    $scope.isShown = () => {
      $scope.shown.show = !$scope.shown.show;
      $scope.editing.editing = false;
    };

    $scope.getRecord = row => {
      $scope.formParams = $scope.allData[row - 1];
      $scope.shown.show = true;
      $scope.editing.editing = true;
    };

    $scope.getUser = () => {
      $http
        // .get("https://opensponsorship-liuz6.herokuapp.com/api")
        .get("https://opensponsorship-zishan2.herokuapp.com/api")
        .then(response => {
          $scope.allData = response.data;
          return response.data.map((person, index) => {
            $scope.users.push({
              position: index + 1,
              name: person.name,
              gender: person.gender,
              birth: person.birth,
              nationality: person.nationality,
              association: person.association,
              team: person.team
            });
          });
        })

        .catch(() => {
          alert("Loading Error");
        });
    };
  }
}
