import { FormpageController } from "./formpage.controller";

export function FormpageDirective() {
  "ngInject";

  let directive = {
    restrict: "E",
    templateUrl: "app/components/formpage/formpage.html",

    scope: {
      creationDate: "="
    },
    controller: FormpageController,
    controllerAs: "vm",
    bindToController: true
  };

  return directive;
}
