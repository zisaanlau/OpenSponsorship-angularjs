/******/!function(t){function a(n){if(e[n])return e[n].exports;var i=e[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,a),i.loaded=!0,i.exports}// webpackBootstrap
/******/
var e={};return a.m=t,a.c=e,a.p="",a(0)}([function(t,a,e){"use strict";var n=e(1),i=e(2),o=e(3),r=e(4),s=e(5);angular.module("openSponsorship",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngRoute","ngMaterial","toastr","angularCSS"]).component("formPage",{templateUrl:"app/components/formpage/formpage.html",controller:s.FormpageController,bindings:{selectedPerson:"=",editing:"<"}}).config(n.config).config(i.routerConfig).run(o.runBlock).controller("MainController",r.MainController)},function(t,a){"use strict";function e(t,a,e){"ngInject";t.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0,e.html5Mode({enabled:!0,requireBase:!1})}e.$inject=["$logProvider","toastrConfig","$locationProvider"],Object.defineProperty(a,"__esModule",{value:!0}),a.config=e},function(t,a){"use strict";function e(t,a){"ngInject";t.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"}),a.html5Mode(!0)}e.$inject=["$routeProvider","$locationProvider"],Object.defineProperty(a,"__esModule",{value:!0}),a.routerConfig=e},function(t,a){"use strict";function e(t){"ngInject";t.debug("runBlock end")}e.$inject=["$log"],Object.defineProperty(a,"__esModule",{value:!0}),a.runBlock=e},function(t,a){"use strict";function e(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});a.MainController=["$scope","$http",function n(t,a){"ngInject";e(this,n),t.shown={show:!1},t.editing={editing:!1},t.users=[],t.formParams={},this.$onInit=function(){t.getUser()},t.isShown=function(){t.shown.show=!t.shown.show,t.editing.editing=!1},t.getRecord=function(a){t.formParams=t.allData[a-1],t.shown.show=!0,t.editing.editing=!0},t.getUser=function(){a.get("https://opensponsorship-zishan2.herokuapp.com/api").then(function(a){return t.allData=a.data,a.data.map(function(a,e){t.users.push({position:e+1,name:a.name,gender:a.gender,birth:a.birth,nationality:a.nationality,association:a.association,team:a.team})})})["catch"](function(){alert("Loading Error")})}}]},function(t,a){"use strict";function e(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});a.FormpageController=["$scope","$http","$window",function n(t,a,i){"ngInject";var o=this;e(this,n),t.formParams=this.selectedPerson,t.stage="stage1",t.formValidation=!1,t.toggleJSONView=!1,t.toggleFormErrorsView=!1,t.genders=["male","female"],t.maritals=["married","single"],t.alcohols=["yes","no"],t.sports=["Golf","Tennis","Cricket","Basketball","Baseball","American Football","Aquatics","Archery","Automobile Racing","Badminton","Beach Volleyball","Bobsleigh","Body Building","Boxing","Cross Country Running","Cross Country Skiing","Curling","Cycling","Darts","Decathlon","Down Hill Skiing","Equestrianism","eSports","Fencing","Field Hockey","Figure Skating","Gymnastics","Ice Hockey","Martial Arts","Mixed Martial Arts","Modern Pentathlon","Motorcycle Racing","Netball","Polo","Racquetball","Rowing","Rugby","Sailing","Softball","Shooting","Skateboarding","Skeet Shooting","Skeleton","Snow Boarding","Soccer (Football)","Squash","Surfing","Swimming","Track and Field"],t.progressValue=0,t.next=function(a){t.formValidation=!0,t.multiStepForm.$valid&&(t.direction=1,t.stage=a,t.formValidation=!1,t.progressValue+=20)},t.dateUpload=function(a){t.formParams.birth=a.target.value},t.imageUpload=function(a){var e=a.target.files,n=new FileReader;n.onload=t.imageIsLoaded,n.readAsDataURL(e[0]),n.onload=function(){t.formParams.profilePic=""}},t.back=function(a){t.direction=0,t.stage=a},t.submitForm=function(){o.editing?t.multiStepForm.$valid&&(t.formValidation=!1,a({method:"PUT",url:"https://opensponsorship-zishan2.herokuapp.com/api",data:t.formParams}).then(function(){alert("Edit succeeded!"),i.location.reload()})["catch"](function(){alert("error!"),i.location.reload()})):a({method:"POST",url:"https://opensponsorship-zishan2.herokuapp.com/api",data:t.formParams}).then(function(){alert("Upload succeeded!"),i.location.reload()})["catch"](function(){alert("error!"),i.location.reload()})},t.reset=function(){t.formParams={},t.stage=""}}]}]),angular.module("openSponsorship").run(["$templateCache",function(t){t.put("app/main/main.html",'<div ng-app=OpenSponsorship ng-controller=MainController><div ng-if=shown.show><form-page selected-person=formParams editing=editing.editing></form-page></div><div ng-if=!shown.show><div class=table-users><div class=header>Athletes</div><table><tr><th>No.</th><th>Name</th><th>Gender</th><th>Date of Birth</th><th>Team</th><th>Association</th></tr><tr ng-repeat="user in users" ng-click=getRecord(user.position)><!-- <td><img src="{{user.image}}" alt="Pic" /></td> --><td>{{ user.position }}</td><td>{{ user.name }}</td><td>{{ user.gender }}</td><td>{{ user.birth }}</td><td>{{ user.team }}</td><td>{{ user.association }}</td></tr></table></div></div><div ng-if=!shown.show class=upload-button><button ng-click=isShown()>Upload Profile</button></div></div>'),t.put("app/components/formpage/formpage.html",'<main ng-app=OpenSponsorship ng-cloak><md-progress-linear md-mode=determinate class=md-accent value={{progressValue}}></md-progress-linear><md-content class=md-padding layout-xs=column layout=row layout-align="center center"><div flex-xs flex-gt-xs=40 layout=column layout-align="center center"><form name=multiStepForm id=submitForm class="submitForm form-validation" role=form novalidate><div class=animate-switch-container ng-switch on=stage ng-class="{forward: direction, backward:!direction}"><!--\n       \n          Stage 1\n      \n        --><md-card class="card-40-center animate-switch stepCard" md-theme-watch ng-switch-when=stage1><md-card-title><md-card-title-text><span class=md-headline>Basic Info</span><md-card-content><div layout=row><md-input-container flex=100><label>Name *</label><input name=name ng-model=formParams.name><div class=validation ng-class="{\'input-error\': formValidation && multiStepForm.name.$error.required}"><!-- This is required. --></div></md-input-container></div><div layout=row><md-input-container flex=100><label>Gender *</label><md-select name=genderValue ng-model=formParams.gender><md-option ng-repeat="sex in genders" ng-value=sex>{{sex}}</md-option></md-select><div class=validation ng-class="{\'input-error\': formValidation && multiStepForm.genderValue.$error.required}"><!-- This is required. --></div></md-input-container></div><div layout=row><!-- Date of birth --><md-input-container flex=100><label>Date of Birth * (format: MM/DD/YYYY)</label><input type=text name=birth pattern=\\d{2}\\/\\d{2}\\/\\d{4} ng-model=formParams.birth><div class=validation ng-class="{\'input-error\': formValidation && multiStepForm.birth.$error.required}"><!-- This is required. --></div></md-input-container></div><div layout=row><md-input-container flex=100><label>Nationality</label><input type=text name=nationality ng-model=formParams.nationality></md-input-container></div><div layout=row><md-input-container flex=100><label>Location</label><input type=text name=location ng-model=formParams.location></md-input-container></div><div layout=row><md-input-container flex=100><label>Marital Status</label><md-select name=marital ng-model=formParams.marital><md-option ng-repeat="marital in maritals" ng-value=marital>{{marital}}</md-option></md-select></md-input-container></div></md-card-content></md-card-title-text></md-card-title><md-card-actions layout=row layout-align="end center"><button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="next(\'stage2\')">Next</button></md-card-actions></md-card><!--\n       \n          Stage 2\n       \n        --><md-card class="card-40-center animate-switch stepCard" md-theme-watch ng-switch-when=stage2><md-card-title><md-card-title-text><span class=md-headline>Personal</span><md-card-content><div layout=row><md-input-container flex=100><label>Interests</label><input type=text name=interests ng-model=formParams.interests></md-input-container></div><div layout=row><md-input-container flex=100><label>Alcohol?</label><md-select name=alcohol ng-model=formParams.alcohol><md-option ng-repeat="alcohol in alcohols" ng-value=alcohol>{{alcohol}}</md-option></md-select></md-input-container></div><div layout=row><md-input-container flex=100><label>Pet(s)</label><input type=text name=pets ng-model=formParams.pets></md-input-container></div><div layout=row><md-input-container flex=100><label>Charities</label><input type=text name=charities ng-model=formParams.charities></md-input-container></div></md-card-content><!-- <md-card-title-media></md-card-title-media> --></md-card-title-text></md-card-title><!-- buttons --><md-card-actions layout=row layout-align="end center"><button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="back(\'stage1\')">Back</button> <button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="next(\'stage3\')">Next</button></md-card-actions></md-card><!-- stage 3 --><md-card class="card-40-center animate-switch stepCard" md-theme-watch ng-switch-when=stage3><md-card-title><md-card-title-text><span class=md-headline>Sports</span><md-card-content><div layout=row><md-input-container flex=100><label>Team *</label><input type=text name=team ng-model=formParams.team><div class=validation ng-class="{\'input-error\': formValidation && multiStepForm.team.$error.required}"><!-- This is required. --></div></md-input-container></div><div layout=row><md-input-container flex=100><label>Association *</label><input type=text name="association " ng-model=formParams.association><div class=validation ng-class="{\'input-error\': formValidation && multiStepForm.association.$error.required}"><!-- This is required. --></div></md-input-container></div><div layout=row><md-input-container flex=100><label>Sports</label><md-select name=sports ng-model=formParams.sports multiple><md-option ng-repeat="sport in sports" ng-value=sport>{{sport}}</md-option></md-select></md-input-container></div></md-card-content><!-- <md-card-title-media></md-card-title-media> --></md-card-title-text></md-card-title><!-- buttons --><md-card-actions layout=row layout-align="end center"><button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="back(\'stage2\')">Back</button> <button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="next(\'stage4\')">Next</button></md-card-actions></md-card><!-- stage4 --><md-card class="card-40-center animate-switch stepCard" md-theme-watch ng-switch-when=stage4><md-card-title><md-card-title-text><span class=md-headline>About</span><md-card-content><div layout=row><md-input-container flex=100><label>Description</label><input type=text name=description ng-model=formParams.about></md-input-container></div><div layout=row><md-input-container flex=100><label>Profile</label><input type=file ng-model-instant onchange=angular.element(this).scope().imageUpload(event) name=profilePic></md-input-container></div><div layout=row><md-input-container flex=100><label>Social Media</label><input type=text name=social ng-model=formParams.socials></md-input-container></div></md-card-content><!-- <md-card-title-media></md-card-title-media> --></md-card-title-text></md-card-title><!-- buttons --><md-card-actions layout=row layout-align="end center"><button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="back(\'stage3\')">Back</button> <button type=button class="md-raised md-warn md-button md-ink-ripple" ng-click="next(\'stage5\')">Next</button></md-card-actions></md-card><!--\n         \n        Stage summary\n       \n        --><md-card class="card-40-center animate-switch stepCard" md-theme-watch ng-switch-when=stage5><md-card-title><md-card-title-text><span class=md-headline>Summary</span> <span class=md-subhead>Name: {{formParams.name}}</span> <span class=md-subhead>Gender: {{formParams.gender}}</span> <span class=md-subhead>Date of Birth: {{formParams.birth}}</span> <span class=md-subhead>Marrital Status: {{formParams.marital}}</span> <span class=md-subhead>Intrests: {{formParams.interests}}</span> <span class=md-subhead>Alcohol: {{formParams.alcohol}}</span> <span class=md-subhead>Pets: {{formParams.pets}}</span> <span class=md-subhead>Charities: {{formParams.charities}}</span> <span class=md-subhead>Team: {{formParams.team}}</span> <span class=md-subhead>Association: {{formParams.association}}</span> <span class=md-subhead>Sports: {{formParams.sports}}</span> <span class=md-subhead>Desciprtion: {{formParams.about}}</span> <span class=md-subhead>Profile: {{formParams.profilePic}}</span> <span class=md-subhead>Social Media: {{formParams.socials}}</span></md-card-title-text><md-card-title-media><button class="md-raised md-warn md-button md-ink-ripple" type=button ng-click="back(\'stage4\')"><span class=ng-scope>Back</span></button> <button class="md-raised md-warn md-button md-ink-ripple" type=button ng-click=submitForm()><span class=ng-scope>Submit</span></button></md-card-title-media></md-card-title></md-card></div></form></div></md-content></main>')}]);
//# sourceMappingURL=../maps/scripts/app-1fe4586086.js.map
