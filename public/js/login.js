var app = angular.module('courseApp', ['ui.router']);

// 导航栏控制器

// 登录模块控制器
app.controller('login_info_controller', ['$scope', '$log', '$rootScope', '$state', function($scope, $log, $rootScope, $state) {
    $scope.$log = $log;
    $scope.return = ""; //用于返回错误信息，正确信息不返回
    $scope.err_username = "";
    $scope.err_pwd = "";
    $scope.user = {
        id: "",
        pwd: "",
        type: "1"
    }; //考虑用cookie

    $scope.findbackPwd_user = {
        id: "",
        type: "1",
        err_getUserQuest: "", //错误的返回结果
        result_getUserQuest: "", //正确的返回结果，存储密保问题
        user_ans: "", //保存密保答案
        wrong_user_ans: "",
        new_pwd1: "",
        new_pwd2: "",
        result_of_modify: ""
    }; //找回密码相关变量

    $scope.login = false;

    $rootScope.teacher_info = {
        name: "",
        department: "",
        job_title: "",
        tel: "",
        email: ""
    };
    $rootScope.student_info = {
        name: "",
        classnames: []
    };
    $rootScope.admin_info = {
        name: ""
    };

    //保存动态加载到导航栏的内容（头像和铃铛）
    $rootScope.dynamic_bar = "view/profile_unlogin.html";

    //$rootScope.noticeInstanceWithContent;
    if (window.XMLHttpRequest) { //XHR创建对象
        // IE7+, Firefox, Chrome, Opera, Safari 代码
        $rootScope.xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 代码
        $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    $rootScope.sendData = function(url, fd, cfunc) {
        $rootScope.xmlhttp.onreadystatechange = cfunc;
        $rootScope.xmlhttp.open("post", url, true);
        $rootScope.xmlhttp.send(fd);
    };

    $rootScope.show_login_model = function() {
        $scope.login = false;
    };

    //登录模块 -->测试已完成
    $rootScope.getLoginResult = function() {
        var fd = new FormData();
        fd.append("id", $scope.user.id);
        fd.append("pwd", $scope.user.pwd);
        fd.append("type", $scope.user.type);
        $rootScope.sendData("/index.php/index/Index/loginUser", fd, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                if ($scope.return === "success") { //三个等号表示值和变量类型都相等
                    $scope.$apply(function() {
                        $scope.err_pwd = "";
                        $scope.err_username = "";
                    });

                    $("#myModal").modal("hide");

                    if ($scope.user.type === "2") {
                        $state.go('showinfo_teacher');
                        $rootScope.dynamic_bar = "view/profile_login_teacher.html";

                        var fd2 = new FormData();
                        $rootScope.sendData("/index.php/index/Index/showUserInfo", fd2, function() {
                            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                                $scope.$apply(function() {
                                    $rootScope.teacher_info.name = $scope.return.name;
                                    $rootScope.teacher_info.department = $scope.return.department;
                                    $rootScope.teacher_info.job_title = $scope.return.job_title;
                                    $rootScope.teacher_info.phonenumber = $scope.return.tel;
                                    $rootScope.teacher_info.email = $scope.return.email;
                                });
                            }
                        });
                    } else if ($scope.user.type === "1") {
                        $state.go('showinfo_student');
                        $rootScope.dynamic_bar = "view/profile_login_stu.html";

                        var fd3 = new FormData();
                        $rootScope.sendData("/index.php/index/Index/showUserInfo", fd3, function() {
                            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                                $scope.$apply(function() {
                                    $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                                    console.log($scope.return);
                                    $rootScope.student_info.name = $scope.return.name;
                                    $rootScope.student_info.classnames = $scope.return.classnames; //数组这样写对不对？
                                });
                            }
                        });
                    } else if ($scope.user.type === "3") { //管理员
                        $state.go('administrator.student');
                        $rootScope.dynamic_bar = "view/profile_login_admin.html";
                        var fd4 = new FormData();
                        $rootScope.sendData("/index.php/index/Index/showUserInfo", fd4, function() {
                            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                                console.log("sdsd");
                                console.log($scope.return);
                                $scope.$apply(function() {
                                    $rootScope.admin_info.name = $scope.return.name;
                                });
                            }
                        });

                    }
                } else if ($scope.return === "false_id") {
                    $scope.$apply(function() {
                        $scope.err_username = "用户名错误";
                        $scope.err_pwd = "";
                    });
                } else if ($scope.return === "false_pwd") {
                    $scope.$apply(function() {
                        $scope.err_pwd = "密码错误";
                        $scope.err_username = "";
                    });
                }
            }

        });
    };



    // 找回密码
    $rootScope.getbackPwd = function() {
        var fd7 = new FormData();
        fd7.append("id", $scope.findbackPwd_user.id);
        fd7.append("type", $scope.findbackPwd_user.type);
        $rootScope.sendData("/index.php/index/Index/getUserQuest", fd7, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if ($scope.return === "false_quest") {
                $scope.$apply(function() {
                    $scope.findbackPwd_user.err_getUserQuest = "问题为空,查询结果不存在!";
                });
            } else if ($scope.return === "false_id") {
                $scope.$apply(function() {
                    $scope.findbackPwd_user.err_getUserQuest = "用户id错误,没有该id!";
                });
            } else { //假设不是这两种返回字符串，剩下的就都是返回密保问题了
                $scope.$apply(function() {
                    $scope.findbackPwd_user.result_getUserQuest = $scope.return; //右边是不是这样写？
                });
                $("#myModal2").modal("hide");
                $("#myModal3").modal("show");
            }
        });

    };

    //返回密保问题，并等待输入答案
    $rootScope.verifyUserAns = function() {
        var fd8 = new FormData();
        fd8.append("ans", $scope.findbackPwd_user.user_ans);
        $rootScope.sendData("/index.php/index/Index/veriUserAns", fd8, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if ($scope.return === "failure") {
                // alert("32324234324");
                $scope.$apply(function() {
                    $scope.findbackPwd_user.wrong_user_ans = "密保答案错误！";
                });
            } else if ($scope.return === "success") { //如果密保问题回答成功，跳转到修改密码模态框
                $("#myModal3").modal("hide");
                $("#myModal4").modal("show");
            }
        });
    };

    $rootScope.setNewPwd = function() {
        if ($scope.findbackPwd_user.new_pwd1 != $scope.findbackPwd_user.new_pwd2) {
            $scope.findbackPwd_user.result_of_modify = "两次输入的密码不一致！";
            $('#loading4').addClass('hidden');

        } else {
            var fd9 = new FormData();
            fd9.append("newPwd", $scope.findbackPwd_user.new_pwd1);
            $rootScope.sendData("/index.php/index/Index/retrUserPwd", fd9, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                }
                if ($scope.return === "success") {
                    //首先显示重置密码成功信息
                    $scope.findbackPwd_user.result_of_modify = "重置密码成功！";
                    $('#loading4').addClass('hidden');

                    //跳转到个人信息界面
                    $("#myModal4").modal("hide");
                    // 这个跳转有问题，需要修改，好像要记住之前选择的cookies

                    //设置成重新登录
                    $scope.err_pwd = "";
                    $scope.user.id = "";
                    $scope.user.pwd = "";
                    $("#myModal").modal("show");
                    //$state.go('showinfo_student');
                    // $scope.dynamic_bar = "view/profile_login_stu.html";
                } else if ($scope.return === "failure") {
                    $scope.$apply(function() {
                        $scope.findbackPwd_user.result_of_modify = "重置密码失败！(与旧密码相同？)";

                    });
                } else if ($scope.return === "false_notset") {
                    $scope.$apply(function() {
                        $scope.findbackPwd_user.result_of_modify = "黑客先生你好！我们小破网站经不起您的打击！";
                    });
                }
            });

        }

    };


    //由学生主界面跳转到修改信息界面
    $rootScope.turnToModify = function() {
        $state.go('modifyinfo_student');
        // 这一句要不要？
        // $scope.dynamic_bar = "view/profile_login_stu.html";

    };

    //由学生主界面跳转到某一门课程的界面
    $rootScope.jump_course = function() {
        $state.go('student_course');
    };

}])

// 修改个人信息控制器
.controller('modify_user_info', ['$scope', '$log', '$rootScope', '$state', function($scope, $log, $rootScope, $state) {
    // 用于个人信息修改
    $scope.edit_stu_info = {
        oldPwd: "",
        newPwd1: "",
        newPwd2: "",
        old_quest: "你最崇拜的偶像是？",
        old_ans: "艾伦·图灵",
        new_quest: "",
        new_ans: "",
        return_of_modify: "", //修改密保的反馈
        return_of_modify2: "" //修改密码的反馈
    };

    $scope.className2 = true; //密码修改
    $scope.className = false; //密保修改



    //修改个人信息 之 学生密保修改
    $rootScope.editStuInfo = function() {
        var fd5 = new FormData();
        fd5.append("quest", $scope.edit_stu_info.new_quest);
        fd5.append("ans", $scope.edit_stu_info.new_ans);
        $rootScope.sendData("/index.php/index/Index/setUserQuest", fd5, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if ($scope.return === "success") {
                $scope.$apply(function() {
                    $scope.edit_stu_info.return_of_modify = "修改密保信息成功！";
                    $scope.className = true;
                });
            } else if ($scope.return === "failure") {
                $scope.$apply(function() {
                    $scope.edit_stu_info.return_of_modify = "修改失败！";
                    $scope.className = false;
                });
            }

        });

    };


    // 修改个人信息 之 学生密码修改  -->测试已完成
    $rootScope.editStuPwd = function() {
        if ($scope.edit_stu_info.newPwd1 != $scope.edit_stu_info.newPwd2) {
            // 为什么有问题加上 下面这句话
            // $scope.$apply(function() {
            $scope.edit_stu_info.return_of_modify2 = "两次新密码输入不一致！";
            $scope.className2 = false;
            // });
        } else {
            var fd6 = new FormData();
            fd6.append("pwd", $scope.edit_stu_info.oldPwd);
            fd6.append("newPwd", $scope.edit_stu_info.newPwd1);
            $rootScope.sendData("/index.php/index/Index/editUserPwd", fd6, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.return = JSON.parse($rootScope.xmlhttp.responseText).result;
                }

                if ($scope.return === "success") //修改新密码成功
                {
                    $scope.$apply(function() {
                        $scope.edit_stu_info.return_of_modify2 = "修改密码成功！";
                        $scope.className2 = true;
                    });

                } else if ($scope.return === "false_pwd") //旧密码输入错误
                {
                    $scope.$apply(function() {
                        $scope.edit_stu_info.return_of_modify2 = "旧密码输入错误！";
                        $scope.className2 = false;
                    });
                } else if ($scope.return === "failure") //修改新密码失败
                {
                    $scope.$apply(function() {
                        $scope.edit_stu_info.return_of_modify2 = "修改失败！";
                        $scope.className2 = false;
                    });
                }

            });
        }
    };

}])

// 显示个人信息控制器



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("modifyinfo_student", {
            url: "/modifyinfo_student",
            templateUrl: "view/ModifyInfo_student.html"
        })

    .state("showinfo_student", {
        url: "/showinfo_student",
        templateUrl: "view/ShowInfo_student.html"
    })

    .state("showinfo_teacher", {
        url: "/showinfo_teacher",
        templateUrl: "view/teacher.html"
    })

    .state("administrator", {
        url: "/administrator",
        templateUrl: "view/administrator.html"
    })

    .state("student_course", {
        url: "/student_course",
        templateUrl: "view/student_course.html"
    });

});
