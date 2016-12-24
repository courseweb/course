app.controller("classController", ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

    // $rootScope.lesson = [{
    //     filename: '汪汪汪',
    //     n_th: 1
    // }, {
    //     filename: '咩咩咩',
    //     n_th: 2
    // }, {
    //     filename: '喵喵喵',
    //     n_th: 3
    // }, {
    //     filename: '咩咩咩',
    //     n_th: '都是你大爷'
    // }, {
    //     filename: '啾啾啾',
    //     n_th: '你大舅'
    // }, {
    //     filename: '啊啊啊',
    //     n_th: '你二舅'
    // }, {
    //     filename: '嗷嗷嗷',
    //     n_th: '你三舅'
    // }, {
    //     filename: '嘭嘭嘭',
    //     n_th: '都是你舅'
    // }, {
    //     filename: '编不下去了我的哥',
    //     n_th: '再来一个'
    // }, {
    //     filename: '好吧我还是可以的',
    //     n_th: '那你很棒哦：）'
    // }, ];

    $rootScope.lesson = [];

    // $rootScope.theoryList = [{
    //     theory_duedate: '2016-12-14',
    //     theory_tip: '该作业已过期限'
    // }, {
    //     theory_duedate: '2016-12-15',
    //     theory_tip: '请尽快完成'
    // }, {
    //     theory_duedate: '2016-12-16',
    //     theory_tip: '请尽快完成'
    // }];

    $rootScope.theoryList = [];

    $rootScope.theory_commentList=[
    {given_score:'1',total_score:'5',remark:'辣鸡'},
    {given_score:'2',total_score:'5',remark:'我不想跟你说话'},
    {given_score:'3',total_score:'5',remark:'你一点都不酷'},
    {given_score:'4',total_score:'5',remark:'不错哟'},
    {given_score:'5',total_score:'5',remark:'你都5.0了能不能别学了'}
    ];


    $rootScope.experiment_commentList = [{
        given_score: '1',
        total_score: '5',
        remark: '辣鸡'
    }, {
        given_score: '2',
        total_score: '5',
        remark: '我不想跟你说话'
    }, {
        given_score: '3',
        total_score: '5',
        remark: '你一点都不酷'
    }, {
        given_score: '4',
        total_score: '5',
        remark: '不错哟'
    }, {
        given_score: '5',
        total_score: '5',
        remark: '你都5.0了能不能别学了'
    }];

    $rootScope.experimentList = [{
        experimentID: '1'
    }, {
        experimentID: '2'
    }, {
        experimentID: '3'
    }, {
        experimentID: '3'
    }, {
        experimentID: '5'
    }, {
        experimentID: '6'
    }, {
        experimentID: '7'
    }, {
        experimentID: '8'
    }];

    $rootScope.course_name = "软件需求工程";
    $rootScope.course_introduce = "谁上谁知道";
    $scope.verifyIdentity = function() {
        var fd = new FormData();
        $rootScope.sendData("/index.php/index/Index/isStudent", fd, function() {
          if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200 || $rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 404) {
              if ($rootScope.xmlhttp.responseText !== "true") {
                  alert("请先登录");
                  $state.go("visitor");
              }
          }
        });
    };
    $scope.verifyIdentity();

    $rootScope.getClass = function() { //课程信息
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getCourseInfo",
            dataType: "json",
            data: {},
            success: function(result) {
                $rootScope.course = result;
                console.log(result);
                console.log($rootScope.course);
            },
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
        });
    };
    $rootScope.getClass();

    $rootScope.getLesson = function() { //课时信息
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getAllSlides",
            data: {},
            dataType: "json",
            success: function(result) {
                $rootScope.$apply(function() {
                    $rootScope.lesson = result;
                });
                console.log($rootScope.lesson);
            },
            error: function() {
                alert('获取数据失败！(Err:P-1)');
            },
        });
        $state.go("student_course.lesson");
    };
    $rootScope.getLesson();

    $rootScope.getTheory = function() {
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getHomeworkInfo",
            data: {},
            dataType: "json",
            success: function(result) {
                $rootScope.theoryList = result;
                console.log(result);
                console.log($rootScope.theoryList);
            },
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
        });
        $state.go("student_course.theory");
    };

    $rootScope.getExperiment = function() {
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getHomeworkInfo",
            data: {},
            dataType: "json",
            success: function(result) {
                $rootScope.theoryList = result;
                console.log(result);
                console.log($rootScope.theoryList);
            },
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
        });
        $state.go("student_course.experiment");
    };

    $rootScope.getTheoryComment = function() { //课时信息
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getHomeworkComment",
            data: {},
            dataType: "json",
            success: function(result) {
                // $scope.$apply(function(){
                $scope.theory_commentList = result.result;
                // }
                console.log(result);
                console.log($scope.theory_commentList);
            },
            error: function(component) {
                alert(component);
            },
        });
        $state.go("student_course.theory_comment");
    };

    $rootScope.getExperimentComment = function() { //课时信息
        $.ajax({
            type: "get",
            url: "/index.php/index/Index/getExperimentComment",
            data: {},
            dataType: "json",
            success: function(result) {
                $rootScope.experiment_commentList = result;
                console.log(result);
                console.log($rootScope.experiment_commentList);
            },
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
        });
        $state.go("student_course.experiment_comment");
    };

    $rootScope.downloadLessonMaterial = function(filename) { //下载文件名
        var fd = new FormData();
        fd.append("filename", filename);
        $.ajax({
            type: "post",
            url: "/index.php/index/Index/downloadSlides",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
            success: function(result) { //data为返回网页链接
                open(result);
                console.log(result);
            }
        });
    };

    $rootScope.downloadExperimentTemplate = function(experimentID) { //下载模板ID
        $.ajax({
            type: "post",
            url: "/index.php/index/Index/downTemplete",
            data: {
                experimentID: experimentID
            },
            dataType: "json",
            error: function() {
                // alert('获取数据失败！(Err:P-1)');
            },
            success: function(result) { //data为返回网页链接
                open(result);
                console.log(result);
            }
        });
    };

    $rootScope.uploadReport = function(experimentID) { //下载模板ID
        $.ajax({
            type: "post",
            url: "/index.php/index/Index/uploadreport",
            data: {
                experimentID: experimentID
            },
            dataType: "json",
            error: function() {
                alert('获取数据失败！(Err:P-1)');
            },
            success: function(result) { //data为返回网页链接
                open(result);
                console.log(result);
            }
        });
    };

    $rootScope.watchVedio = function(filename) { //由课程名得到播放链接
        $.ajax({
            type: "post",
            url: "/index.php/index/Index/uploadvideo",
            data: {
                filename: filename
            },
            error: function() {
                alert('获取数据失败！(Err:P-1)');
            },
            success: function(result) { //data为返回网页链接
                open(result);
                console.log(result);
            }
        });
    };

    //分页---------------------------------------------------
    $scope.pageSize = 10;
    $scope.pages = Math.ceil($rootScope.lesson.length / $scope.pageSize); //分页数
    $scope.newPages = $scope.pages > 10 ? 1 : $scope.pages;
    $scope.pageList = [];
    $scope.selPage = 1;
    //设置表格数据源(分页)
    $scope.setData = function() {
        $scope.items = $scope.lesson.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
    };
    $scope.items = $scope.lesson.slice(0, $scope.pageSize);
    //分页要repeat的数组
    for (var i = 0; i < $scope.newPages; i++) {
        $scope.pageList.push(i + 1);
    }
    //打印当前选中页索引
    $scope.selectPage = function(page) {
        //不能小于1大于最大
        if (page < 1 || page > $scope.pages) return;
        //最多显示分页数5
        if (page > 2) {
            //因为只显示5个页数，大于2页开始分页转换
            var newpageList = [];
            for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                newpageList.push(i + 1);
            }
            $scope.pageList = newpageList;
        }
        $scope.selPage = page;
        $scope.setData();
        $scope.isActivePage(page);
        console.log("选择的页：" + page);
    };
    //设置当前选中页样式
    $scope.isActivePage = function(page) {
        return $scope.selPage == page;
    };
    //上一页
    $scope.Previous = function() {
        $scope.selectPage($scope.selPage - 1);
    };
    //下一页
    $scope.Next = function() {
        $scope.selectPage($scope.selPage + 1);
    };
    //分页---------------------------------------------------

}]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("student_course.lesson", {
            url: "/s_lesson",
            templateUrl: "view/s_lesson.html"
        })
        .state("student_course.theory", {
            url: "/s_theory",
            templateUrl: "view/s_theory.html"
        })
        .state("student_course.experiment", {
            url: "/s_experiment",
            templateUrl: "view/s_experiment.html"
        })
        .state("student_course.comment", {
            url: "/s_comment",
            templateUrl: "view/s_comment.html"
        })
        .state("student_course.theory_comment", {
            url: "/s_theory_comment",
            templateUrl: "view/s_theory_comment.html"
        })
        .state("student_course.experiment_comment", {
            url: "/s_experiment_comment",
            templateUrl: "view/s_experiment_comment.html"
        })
        .state("student_course.theory.theoryitem", {
            url: "/s_theoryitem",
            templateUrl: "view/s_theoryitem.html"
        });

});
