export function routerConfig($routeProvider, $locationProvider) {
  "ngInject";

  $routeProvider
    // .when("/formpage", {
    //   templateUrl: "app/components/formpage/formpage.html",
    //   controller: "FormpageController",
    //   controllerAs: "form",
    //   css: "assets/css/formpage.css"
    // })
    .when("/", {
      templateUrl: "app/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })

    .otherwise({
      redirectTo: "/"
    });
  $locationProvider.html5Mode(true);
}
