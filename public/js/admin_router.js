app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("administrator.student", {
                url: "/student",
                templateUrl: "view/administrator.student.html"
            })
            .state("administrator.teacher", {
                url: "/teacher",
                templateUrl: "view/administrator.teacher.html"
            })
            .state("administrator.course", {
                url: "/course",
                templateUrl: "view/administrator.course.html"
            })
            .state("administrator.class", {
                url: "/class",
                templateUrl: "view/administrator.class.html"
            });
    });
