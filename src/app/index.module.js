// /* global malarkey:false, moment:false */

import { config } from "./index.config";
import { routerConfig } from "./index.route";
import { runBlock } from "./index.run";
import { MainController } from "./main/main.controller";
import { FormpageController } from "./components/formpage/formpage.controller";

angular
  .module("openSponsorship", [
    "ngAnimate",
    "ngCookies",
    "ngTouch",
    "ngSanitize",
    "ngMessages",
    "ngAria",
    "ngRoute",
    "ngMaterial",
    "toastr",
    "angularCSS"
  ])
  .component("formPage", {
    templateUrl: "app/components/formpage/formpage.html",
    controller: FormpageController,
    bindings: { selectedPerson: "=", editing: "<" }
  })

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .controller("MainController", MainController);
