angular.module('login_info',[]).controller('login_info_controller',['$scope', '$log', '$rootScope', function($scope,$log,$rootScope){
    $scope.$log   =$log;
    $scope.return ="";//用于返回错误信息，正确信息不返回
    $scope.err_username = "";
    $scope.err_pwd      = "";
    $scope.user   = {id:"",pwd:"",type:"1"};//考虑用cookie
    $scope.FindbackPwd_user = {id:"",type:"5"};//找回密码第一步：输入id和类型

    // 用于个人信息修改
    $scope.edit_stu_info = {oldPwd:"",newPwd:"",
                            old_quest:"你最崇拜的偶像是？",old_ans:"艾伦·图灵",
                            new_quest:"",new_ans:"",
                            return_of_modify:"修改密保失败！",
                            return_of_modify2:"修改成功！"};
    $scope.className2= true;//密码修改
    $scope.className = false;//密保修改
    
    $scope.teacher_info = {name:"",department:"",job_title:"",tel:"",email:""};
    $scope.student_info = {name:"王懿芳",classnames:["软件需求工程-1班","软件工程管理-2班","操作系统-1班","计算机网络-1班"]};
    $scope.admin_info   = {name:""};
    

    //$rootScope.noticeInstanceWithContent;
    if (window.XMLHttpRequest) {//XHR创建对象
          // IE7+, Firefox, Chrome, Opera, Safari 代码
          $rootScope.xmlhttp = new XMLHttpRequest();
    }
    else {
          // IE6, IE5 代码
          $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // var fd3 = new FormData();
    // $rootScope.sendData("/index.php/index/Index/showUserInfo", fd3, function() {
    //   if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
    //     $scope.$apply(function(){
    //       $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
    //       $scope.student_info.name =  $scope.return.name;
    //       $scope.student_info.classnames =  $scope.return.classnames;  //数组这样写对不对？
    //     });
    //   }
    // });
    
    $rootScope.sendData = function(url, fd, cfunc) {
        $rootScope.xmlhttp.onreadystatechange = cfunc;
        $rootScope.xmlhttp.open("post", url, true);
        $rootScope.xmlhttp.send(fd);
    };

    //登录模块
    $rootScope.getLoginResult = function(){
        var fd = new FormData();
        fd.append("id",$scope.user.id);
        fd.append("pwd",$scope.user.pwd);
        fd.append("type",$scope.user.type);
        $rootScope.sendData("/index.php/index/Index/loginUser", fd, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
              $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if($scope.return==="success")//三个等号表示值和变量类型都相等
            { 
                $scope.$apply(function () {
                  $scope.err_pwd="";
                  $scope.err_username="";
                }); 
                // //跳转界面，不同身份跳转的页面不一样  state.go……

                if($scope.user.type==="2")//如果是教师的话
                {
                  var fd2 = new FormData();
                  $rootScope.sendData("/index.php/index/Index/showUserInfo", fd2, function() {
                    if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                      $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
                      $scope.teacher_info.name =  $scope.return.name;
                      $scope.teacher_info.department =  $scope.return.department;
                      $scope.teacher_info.job_title =  $scope.return.job_title;
                      $scope.teacher_info.phonenumber =  $scope.return.tel;
                      $scope.teacher_info.email =  $scope.return.email;
                    }
                  });
                }
                

                else if($scope.user.type==="1")//学生，我只要做学生就可以
                {
                  var fd3 = new FormData();
                  $rootScope.sendData("/index.php/index/Index/showUserInfo", fd3, function() {
                    if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                      $scope.$apply(function(){
                        $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
                        $scope.student_info.name =  $scope.return.name;
                        $scope.student_info.classnames =  $scope.return.classnames;  //数组这样写对不对？
                      });
                    }
                  });
                }

                else if($scope.user.type==="3")//管理员
                {
                  var fd4 = new FormData();
                  $rootScope.sendData("/index.php/index/Index/showUserInfo", fd4, function() {
                    if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                      $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
                       $scope.admin_info.name =  $scope.return.name;
                     }
                   });

                }//写函数，取得用户名、信息等
                
            }else if($scope.return==="false_id")
            {
              $scope.$apply(function () {
                $scope.err_username="用户名错误";
                $scope.err_pwd="";
              });       
            }else if($scope.return==="false_pwd")
            {
              $scope.$apply(function () {
                $scope.err_pwd="密码错误";
                $scope.err_username="";
              });
            }
        });
    };

    // 找回密码 

    
    //修改个人信息 之 学生信息修改
    $rootScope.editStuInfo = function(){
      var fd3 = new FormData();
        fd.append("quest",$scope.edit_stu_info.new_quest);
        fd.append("ans",$scope.edit_stu_info.new_ans);
        $rootScope.sendData("/index.php/index/Index/loginUser", fd3, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
              $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if($scope.return==="success")
            {
               $scope.edit_stu_info.return_of_modify = "修改密保信息成功！"; 
               $scope.className = true;

            }

            else if($scope.return==="failure")
            {
               $scope.edit_stu_info.return_of_modify = "修改失败！"; 
               $scope.className = false;
            }

          });
    };


    // 修改个人信息 之 学生密码修改
    $rootScope.editStuCode = function(){
      var fd4 = new FormData();
        fd.append("pwd",$scope.edit_stu_info.oldPwd);
        fd.append("newPwd",$scope.edit_stu_info.newPwd);
        $rootScope.sendData("/index.php/index/Index/loginUser", fd4, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
              $scope.return=JSON.parse($rootScope.xmlhttp.responseText).result;
            }

            if($scope.return==="success")//修改新密码成功
            {
               $scope.edit_stu_info.return_of_modify2 = "修改密码成功！"; 
               $scope.className2 = true;

            }

            else if($scope.return==="false_pwd") //旧密码输入错误
            {
              $scope.edit_stu_info.return_of_modify2 = "旧密码输入错误！"; 
               $scope.className2 = false;
            }

            else if($scope.return==="failure")//修改新密码失败
            {
               $scope.edit_stu_info.return_of_modify2 = "修改失败！"; 
               $scope.className2 = false;
            }

          });
    };

     $rootScope.getbackPwd = function(){

    };
}]);