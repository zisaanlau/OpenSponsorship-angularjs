export class FormpageController {
  constructor($scope, $http, $window) {
    "ngInject";
    // defaultState = "stage1";
    $scope.formParams = this.selectedPerson;
    $scope.stage = "stage1";
    $scope.formValidation = false;
    $scope.toggleJSONView = false;
    $scope.toggleFormErrorsView = false;

    // this.$onInit = () => {
    //   console.info(this.editing);
    // };

    $scope.genders = ["male", "female"];
    $scope.maritals = ["married", "single"];
    $scope.alcohols = ["yes", "no"];
    $scope.sports = [
      "Golf",
      "Tennis",
      "Cricket",
      "Basketball",
      "Baseball",
      "American Football",
      "Aquatics",
      "Archery",
      "Automobile Racing",
      "Badminton",
      "Beach Volleyball",
      "Bobsleigh",
      "Body Building",
      "Boxing",
      "Cross Country Running",
      "Cross Country Skiing",
      "Curling",
      "Cycling",
      "Darts",
      "Decathlon",
      "Down Hill Skiing",
      "Equestrianism",
      "eSports",
      "Fencing",
      "Field Hockey",
      "Figure Skating",
      "Gymnastics",
      "Ice Hockey",
      "Martial Arts",
      "Mixed Martial Arts",
      "Modern Pentathlon",
      "Motorcycle Racing",
      "Netball",
      "Polo",
      "Racquetball",
      "Rowing",
      "Rugby",
      "Sailing",
      "Softball",
      "Shooting",
      "Skateboarding",
      "Skeet Shooting",
      "Skeleton",
      "Snow Boarding",
      "Soccer (Football)",
      "Squash",
      "Surfing",
      "Swimming",
      "Track and Field"
    ];

    $scope.progressValue = 0;

    $scope.next = stage => {
      $scope.formValidation = true;

      if (
        stage === "stage2" &&
        $scope.formParams.name != null &&
        $scope.formParams.gender != null &&
        $scope.formParams.birth != null
      ) {
        $scope.direction = 1;
        $scope.stage = stage;
        $scope.progressValue += 20;
        $scope.formValidation = false;
      } else if (stage === "stage3" || stage === "stage5") {
        $scope.direction = 1;
        $scope.stage = stage;
        $scope.progressValue += 20;
        $scope.formValidation = false;
      } else if (
        stage === "stage4" &&
        $scope.formParams.team != null &&
        $scope.formParams.association != null
      ) {
        $scope.direction = 1;
        $scope.stage = stage;
        $scope.progressValue += 20;
        $scope.formValidation = false;
      } else {
        alert("Please fill the required fields!");
        return;
      }
    };

    $scope.dateUpload = event => {
      $scope.formParams.birth = event.target.value;
    };

    $scope.imageUpload = event => {
      var files = event.target.files;

      var reader = new FileReader();
      reader.onload = $scope.imageIsLoaded;
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        // console.info(reader.result.toString().split(",")[1]);
        // $scope.formParams.profile = reader.result.toString().split(",")[1];
        $scope.formParams.profilePic = "";
      };
    };

    $scope.back = stage => {
      $scope.direction = 0;
      $scope.stage = stage;
      $scope.progressValue -= 20;
    };

    $scope.submitForm = () => {
      if (!this.editing) {
        $http({
          method: "POST",
          url: "https://opensponsorship-zishan2.herokuapp.com/api",
          data: $scope.formParams
        })
          .then(() => {
            alert("Upload succeeded!");
            $window.location.reload();
          })
          .catch(() => {
            alert("error!");
            $window.location.reload();
          });
      } else {
        if ($scope.multiStepForm.$valid) {
          $scope.formValidation = false;
          $http({
            method: "PUT",
            url: "https://opensponsorship-zishan2.herokuapp.com/api",
            data: $scope.formParams
          })
            .then(() => {
              alert("Edit succeeded!");
              $window.location.reload();
            })
            .catch(() => {
              alert("error!");
              $window.location.reload();
            });
        }
      }
    };

    $scope.reset = () => {
      $scope.formParams = {};
      $scope.stage = "";
    };
  }
}
