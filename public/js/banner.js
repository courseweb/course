app
    .controller('banner', function($scope, $rootScope, $state) {
        $scope.isMouseOver = "";
        $rootScope.isBannerVisible = true;
        $scope.allMainPageCourses = [{
            t_name: "邢卫",
            tel: "13958030163",
            department: "计算机学院人工智能研究所",
            job_title: "副教授",
            email: "wxing@zju.edu.cn",
            teach_hours: "3h",
            prerequ: "软件工程基础",
            introduction: "本课程讲述了需求工程中的5个独立的阶段,包括需求获取、需求建模、形成需求规格、需求验证和需求管理。通过本课程希望培养学生的实际动手能力和实践能力，为软件工程专业的学生将来走上工作岗位打下坚实的基础"
        }, {
            t_name: "金波",
            tel: "13958030163",
            department: "计算机学院系统结构与网络安全研究所",
            job_title: "高级工程师",
            email: "wxing@zju.edu.cn",
            teach_hours: "3h",
            prerequ: "软件工程基础",
            introduction: "本课程讲述了需求工程中的5个独立的阶段,包括需求获取、需求建模、形成需求规格、需求验证和需求管理。通过本课程希望培养学生的实际动手能力和实践能力，为软件工程专业的学生将来走上工作岗位打下坚实的基础"
        }, {
            t_name: "张引",
            tel: "13958030163",
            department: "计算机学院人工智能研究所",
            job_title: "副教授",
            email: "wxing@zju.edu.cn",
            teach_hours: "3h",
            prerequ: "软件工程基础",
            introduction: "本课程讲述了需求工程中的5个独立的阶段,包括需求获取、需求建模、形成需求规格、需求验证和需求管理。通过本课程希望培养学生的实际动手能力和实践能力，为软件工程专业的学生将来走上工作岗位打下坚实的基础"
        }];
        $scope.focusCourseInfo = {};
        $scope.showSpecificInfo = function(number) {
            if (number === 0) {
                $scope.focusCourseInfo = $scope.allMainPageCourses[0];
            } else if (number === 1) {
                $scope.focusCourseInfo = $scope.allMainPageCourses[1];
            } else if (number === 2) {
                $scope.focusCourseInfo = $scope.allMainPageCourses[2];
            }
            $scope.isMouseOver = true;
        };
        $scope.hideSpecificInfo = function() {
            $scope.isMouseOver = "";
        };
        $scope.getCourseAndTeacherInfo = function() {
            var fd = new FormData();
            $rootScope.sendData("/index.php/index/Admin/getAllClasses", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.allMainPageCourses = JSON.parse($rootScope.xmlhttp.responseText);

                }
            });
        };
        // $scope.getCourseAndTeacherInfo();




    });
