<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:72:"D:\xampp\htdocs\course\public/../application/index\view\index\index.html";i:1482407621;}*/ ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/ShowInfo_stu.css" />
    <link rel="stylesheet" href="css/ModifyInfo_stu.css" />
    <link rel="stylesheet" href="css/t_uploadMaterial.css" />
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/admin_public.css">
    <link rel="stylesheet" href="css/admin_class.css">
    <link rel="stylesheet" href="css/admin_course.css">
    <link rel="stylesheet" href="css/admin_public.css">
    <link rel="stylesheet" href="css/admin_student.css">
    <link rel="stylesheet" href="css/admin_teacher.css">
    <style>
        [ng\:cloak],
        [ng-cloak],
        [data-ng-cloak],
        [x-ng-cloak],
        .ng-cloak,
        .x-ng-cloak {
            display: none !important;
        }

        body {
            -webkit-font-smoothing: antialiased;
            font: normal 15px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #232525;
            margin-top: 20px;
        }
    </style>
    <!-- 这个必须放在这里，要不然登陆的时候的那个等待符号就加载不出来了 -->
    <script src="js/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $("#myNav").affix({
                offset: {
                    top: 150
                }
            });
        });
    </script>
</head>


<!-- 开始正文 -->

<body ng-app="courseApp" ng-cloak>
    <!-- 导航栏 -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
                <a style="font-weight:bold;" class="navbar-brand" href="#"><span class="glyphicon glyphicon-th-large"></span>教学辅助系统测试版</a>
            </div>


            <div id="navbar" class="navbar-collapse collapse">
                <!-- 向左对齐 -->
                <ul class="nav navbar-nav navbar-left">
                    <li style="font-weight:bold;"><a href="javascript:">主页</a></li>
                    <li style="font-weight:bold;"><a href="javascript:">关于我们</a></li>
                    <li style="font-weight:bold;"><a href="javascript:">联系我们</a></li>
                    <li class="dropdown">
                        <a style="font-weight:bold;" href="#" class="dropdown-toggle" data-toggle="dropdown">不知道写什么 <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript:">Action</a></li>
                            <li><a href="javascript:">Another action</a></li>
                            <li><a href="javascript:">Something else here</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-header">Nav header</li>
                            <li><a href="javascript:">Separated link</a></li>
                            <li><a href="javascript:">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>

                <!-- 向右对其 -->
                <div ng-include="dynamic_bar">
                    <!--有ng的地方不需要花括号{}，直接“”引用即可-->
                </div>
            </div>
    </nav>
    <!-- end of 导航栏-->

    <div ng-controller="login_info_controller">
        <!-- 模态框1-登录窗口（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-body">

                    <!-- Interactive Login - START -->
                    <div class="container-fluid" style="margin-top: 30%;">
                        <div class="row">
                            <div class="loginpanel">
                                <i id="loading" class="hidden fa fa-spinner fa-spin bigicon"></i>
                                <h2>
                                                <span class="fa fa-quote-left "></span> 登录 <span class="fa fa-quote-right "></span>
                                            </h2>
                                <div>
                                    <div class="row">
                                        <div class="col-md-0"></div>
                                        <div class="col-md-12">
                                            <input ng-model="user.id" id="username" type="text" placeholder="登录账号" onkeypress="check_values();">
                                            <p style="color: #FF6633; text-align:left;">
                                                {{err_username}}
                                            </p>
                                        </div>
                                        <div class="col-md-0"></div>

                                        <div class="col-md-0"></div>
                                        <div class="col-md-12">
                                            <input ng-model="user.pwd" id="password" type="password" placeholder="输入密码" onkeypress="check_values();">
                                            <p style="color: #FF6633;text-align:left;">
                                                {{err_pwd}}
                                            </p>
                                        </div>
                                        <div class="col-md-0"></div>

                                        <div class="col-md-0"></div>
                                        <div class="col-md-12">
                                            <div class="radio">
                                                <label>
                                                            <input type="radio" name="optionsRadios" value="1" ng-model="user.type" style="width: auto;">学生
                                                          </label>
                                                <label>
                                                            <input type="radio" name="optionsRadios" value="2" ng-model="user.type" style="width: auto;">老师
                                                          </label>
                                                <label>
                                                            <input type="radio" name="optionsRadios" value="3" ng-model="user.type" style="width: auto;">管理员
                                                          </label>
                                            </div>
                                        </div>
                                        <div class="col-md-0"></div>
                                    </div>


                                    <div class="buttonwrapper">
                                        <button id="loginbtn" class="btn btn-primary loginbutton" ng-click="getLoginResult()">
                                                        <span class="fa fa-check"></span>
                                                    </button>
                                        <span id="lockbtn" class="fa fa-lock lockbutton redborder"></span>
                                    </div>

                                    <div>
                                        <label>
                                                         <button style="font-weight:bold;" class="btn btn-link" data-toggle="modal" data-target="#myModal2" id="FindbackPwd" >忘记密码？</button>
                                                    </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 以下JS脚本是显示提交按钮的动画的 -->
                    <script type="text/javascript">
                        function check_values() {
                            if ($("#username").val().length != 0 && $("#password").val().length != 0) {
                                $("#loginbtn").animate({
                                    left: '0',
                                    duration: 'slow'
                                });;
                                $("#lockbtn").animate({
                                    left: '260px',
                                    duration: 'slow'
                                });;
                            }
                        }

                        $("#loginbtn").click(function() {
                            $('#loading').removeClass('hidden');
                            //这里书写登录相关后台处理，例如: Ajax请求用户名和密码验证
                        });
                    </script>
                    <!-- Interactive Login - END -->

                </div>
                <!-- .modal-body -->
                <!-- </div>/.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

        <!-- 模态框2-找回密码窗口 之 传回密保问题-->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-body">

                    <!-- Interactive Login - START -->
                    <div class="container-fluid" style="overflow-y:auto">
                        <div class="row" style="overflow-y:auto">
                            <div class="loginpanel" style="overflow-y:auto">
                                <i id="loading2" class="hidden fa fa-spinner fa-spin bigicon"></i>
                                <h2>
                                                <span class="fa fa-quote-left "></span> 找回密码 <span class="fa fa-quote-right "></span>
                                            </h2>
                                <div>
                                    <input ng-model="findbackPwd_user.id" id="username2" type="text" placeholder="输入用户名" onkeypress="check_values_user2();">

                                    <p style="color: #FF6633; text-align:left;">
                                        {{findbackPwd_user.err_getUserQuest}}
                                    </p>

                                    <div class="radio">
                                        <label>
                                                  <input type="radio" name="optionsRadios1" value="1" checked ng-model="findbackPwd_user.type" style="width: auto;">学生
                                        </label>
                                        <label>
                                                    <input type="radio" name="optionsRadios1" value="2" ng-model="findbackPwd_user.type" style="width: auto;">老师
                                        </label>
                                        <label>
                                                  <input type="radio" name="optionsRadios1" value="3" ng-model="findbackPwd_user.type" style="width: auto;">管理员
                                        </label>
                                    </div>

                                    <div class="buttonwrapper">
                                        <button id="loginbtn2" class="btn btn-primary loginbutton" ng-click="getbackPwd()">
                                                    <span class="fa fa-check"></span>
                                                    </button>
                                        <span id="lockbtn2" class="fa fa-lock lockbutton redborder"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 以下JS脚本是显示提交按钮的动画的 -->
                    <script type="text/javascript">
                        function check_values_user2() {
                            if ($("#username2").val().length != 0) {
                                $("#loginbtn2").animate({
                                    left: '0',
                                    duration: 'slow'
                                });;
                                $("#lockbtn2").animate({
                                    left: '260px',
                                    duration: 'slow'
                                });;
                            }
                        }

                        $("#loginbtn2").click(function() {
                            $('#loading2').removeClass('hidden');
                            //这里书写登录相关后台处理，例如: Ajax请求用户名和密码验证
                        });
                    </script>
                    <!-- Interactive Login - END -->

                </div>
                <!-- .modal-body -->
                <!-- </div>/.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

        <!-- 模态框3-找回密码窗口 之 输入密保答案-->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-body">

                    <!-- Interactive Login - START -->
                    <div class="container-fluid" style="overflow-y:auto">
                        <div class="row" style="overflow-y:auto">
                            <div class="loginpanel" style="overflow-y:auto">
                                <i id="loading3" class="hidden fa fa-spinner fa-spin bigicon"></i>
                                <h2>
                                    <span class="fa fa-quote-left "></span> 找回密码 <span class="fa fa-quote-right "></span>
                                </h2>
                                <div>
                                    <p style="color: white; text-align:left; font-weight:800; font-style:italic; font-size: 20px;">
                                        {{findbackPwd_user.result_getUserQuest}}
                                    </p>

                                    <input ng-model="findbackPwd_user.user_ans" id="answer" type="text" placeholder="输入密保问题答案" onkeypress="check_values_user3();">

                                    <p style="color: #FF6633; text-align:left; font-weight:bold;">
                                        {{findbackPwd_user.wrong_user_ans}}
                                    </p>

                                    <div class="buttonwrapper">
                                        <button id="loginbtn3" class="btn btn-primary loginbutton" ng-click="verifyUserAns()">
                                            <span class="fa fa-check"></span>
                                        </button>
                                        <span id="lockbtn3" class="fa fa-lock lockbutton redborder"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 以下JS脚本是显示提交按钮的动画的 -->
                    <script type="text/javascript">
                        function check_values_user3() {
                            if ($("#answer").val().length != 0) {
                                $("#loginbtn3").animate({
                                    left: '0',
                                    duration: 'slow'
                                });;
                                $("#lockbtn3").animate({
                                    left: '260px',
                                    duration: 'slow'
                                });;
                            }
                        }

                        $("#loginbtn3").click(function() {
                            $('#loading3').removeClass('hidden');
                            //这里书写登录相关后台处理，例如: Ajax请求用户名和密码验证
                        });
                    </script>
                    <!-- Interactive Login - END -->

                </div>
                <!-- .modal-body -->
                <!-- </div>/.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

        <!-- 模态框4-找回密码窗口 之 重置新密码-->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-body">

                    <!-- Interactive Login - START -->
                    <div class="container-fluid" style="overflow-y:auto">
                        <div class="row" style="overflow-y:auto">
                            <div class="loginpanel" style="overflow-y:auto">
                                <i id="loading4" class="hidden fa fa-spinner fa-spin bigicon"></i>
                                <h2>
                                    <span class="fa fa-quote-left "></span> 重置密码 <span class="fa fa-quote-right "></span>
                                </h2>
                                <div>
                                    <input ng-model="findbackPwd_user.new_pwd1" id="pwd1" type="password" placeholder="输入新密码" onkeypress="check_values_user4();">
                                    <input ng-model="findbackPwd_user.new_pwd2" id="pwd2" type="password" placeholder="再次输入新密码" onkeypress="check_values_user4();">

                                    <p style="color: #FF6633; text-align:left;">
                                        {{findbackPwd_user.result_of_modify}}
                                    </p>

                                    <div class="buttonwrapper">
                                        <button id="loginbtn4" class="btn btn-primary loginbutton" ng-click="setNewPwd()">
                                            <span class="fa fa-check"></span>
                                        </button>
                                        <span id="lockbtn4" class="fa fa-lock lockbutton redborder"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 以下JS脚本是显示提交按钮的动画的 -->
                    <script type="text/javascript">
                        function check_values_user4() {
                            if ($("#pwd1").val().length != 0 && $("#pwd2").val().length != 0) {
                                $("#loginbtn4").animate({
                                    left: '0',
                                    duration: 'slow'
                                });;
                                $("#lockbtn4").animate({
                                    left: '260px',
                                    duration: 'slow'
                                });;
                            }
                        }

                        $("#loginbtn4").click(function() {
                            $('#loading4').removeClass('hidden');
                            //这里书写登录相关后台处理，例如: Ajax请求用户名和密码验证
                        });
                    </script>
                    <!-- Interactive Login - END -->

                </div>
                <!-- .modal-body -->
                <!-- </div>/.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

    </div>



    <ui-view></ui-view>
    <script type="text/javascript">
        $("#FindbackPwd").click(function() {
            $("#myModal").modal("hide");
        });
    </script>

    <script src="js/bootstrap.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/angular-ui-router.min.js"></script>
    <script src="js/login.js"></script>
    <script src="js/admin_router.js"></script>
    <script src="js/administrator.js"></script>
    <script src="js/teacher_router.js"></script>
    <script src="js/teacher.js"></script>
    <script src="js/studentClass.js">
    </script>

    <script>
        $(function() {
            $("[data-toggle='popover']").popover({
                html: true //这样就可以在内容里面添加HTML代码了
            });
        });
    </script>


</body>

</html>
