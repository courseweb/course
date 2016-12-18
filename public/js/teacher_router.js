app.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state("showinfo_teacher.t_check_info", {
                url: "/t_check_info",
                templateUrl: "view/t_check_info.html"
            })
            .state("showinfo_teacher.t_publish_info", {
                url: "/t_publish_info",
                templateUrl: "view/t_publish_info.html"
            })
            .state("showinfo_teacher.t_check_xinde", {
                url: "/t_check_xinde",
                templateUrl: "view/t_check_xinde.html"
            })
            .state("showinfo_teacher.t_publish_xinde", {
                url: "/t_publish_xinde",
                templateUrl: "view/t_publish_xinde.html"
            })
            .state("showinfo_teacher.t_publish_homework", {
                url: "/t_publish_homework",
                templateUrl: "view/t_publish_homework.html"
            })
            .state("showinfo_teacher.t_correct_homework", {
                url: "/t_correct_homework",
                templateUrl: "view/t_correct_homework.html"
            })
            .state("showinfo_teacher.t_upload_material", {
                url: "/t_upload_material",
                templateUrl: "view/t_upload_material.html"
            });
    });
