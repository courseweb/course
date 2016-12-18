var app =  angular.module('courseApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "t_check_info");

        $stateProvider
            .state("t_check_info", {
                url: "/t_check_info",
                templateUrl: "view/t_check_info.html"
            })
            .state("t_publish_info", {
                url: "/t_publish_info",
                templateUrl: "view/t_publish_info.html"
            })
            .state("t_check_xinde", {
                url: "/t_check_xinde",
                templateUrl: "view/t_check_xinde.html"
            })
            .state("t_publish_xinde", {
                url: "/t_publish_xinde",
                templateUrl: "view/t_publish_xinde.html"
            })
            .state("t_publish_homework", {
                url: "/t_publish_homework",
                templateUrl: "view/t_publish_homework.html"
            })
            .state("t_correct_homework", {
                url: "/t_correct_homework",
                templateUrl: "view/t_correct_homework.html"
            })
            .state("t_upload_material", {
                url: "/t_upload_material",
                templateUrl: "view/t_upload_material.html"
            });
    });
