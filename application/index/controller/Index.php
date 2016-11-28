<?php

namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        return $this->fetch();
    }

    /** 
     * loginUser()用于登录
     * 
     * 函数的参数如下
     * 用户id:      $_POST['id']
     * 用户类型:    $_POST['type'],{学生=1,老师=2,管理员=3}
     * 用户密码:    $_POST['pwd']
     * 
     * @return json_encode($arr)
     * 类型错误:    {"result":"false_type"}
     * 账号错误:    {"result":"false_id"}
     * 密码错误:    {"result":"false_pwd"}
     * 登录成功:    {"result":"success"}
     */  
    public function loginUser(){
        $id=$_POST['id'];
        $pwd=md5($_POST['pwd']);
        $type=$_POST['type'];
         
        $user = new \app\index\model\UserModel();
        $result = $user->login($id,$pwd,$type);
        echo $result;
    }

    /** 
     * editUserPwd()用于在登录之后修改密码
     * 
     * 函数的参数如下
     * 用户旧密码:    $_POST['pwd']
     * 用户新密码:    $_POST['newPwd']
     * 
     * @return json_encode($arr)
     * 未登录:        {"result":"false_unlogin"}
     * 旧密码错误:    {"result":"false_pwd"}
     * 修改新密码失败:{"result":"failure"}
     * 修改新密码成功:{"result":"success"}
     */  
    public function editUserPwd(){
        $pwd=md5($_POST['pwd']);
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->editPwd($pwd,$newPwd);
        echo $result;
    }

    /** 
     * getUserQuest()用于获取用户的密保问题
     * 
     * 函数的参数如下
     * 用户id:                 $_POST['id']
     * 用户类型:               $_POST['type']
     * 
     * @return json_encode($arr)
     * 账户类型错误:           {"result":"false_type"}
     * 问题为空,查询结果不存在:{"result":"false_quest"}
     * 用户id错误,没有该id:    {"result":"false_id"}
     * 获取成功,返回问题内容:  {"result":$result}
     *     $result="";
     */  
    public function getUserQuest(){
        $id=$_POST['id'];
        $type=$_POST['type'];

        $user = new \app\index\model\UserModel();
        $result = $user->getQuest($id,$type);
        echo $result;
    }

    /**
     * veriUserAns()用于验证用户密保答案
     *
     * 函数的参数如下
     * 密保答案:                       $_POST['ans']
     *
     * @return json_encode($arr)
     * 没有获取密保问题,无法得知用户id:{"result":"false_notset"}
     * 用户类型错误,只有老师学生可操作:{"result":"false_type"}
     * 验证密保答案失败:               {"result":"failure"}
     * 验证密保答案成功:               {"result":"success"}
     */
    public function veriUserAns(){
        $ans=$_POST['ans'];

        $user = new \app\index\model\UserModel();
        $result = $user->veriAns($ans);
        echo $result;
    }

    /**
     * retrUserPwd()用于重设用户密码
     *
     * 函数参数如下
     * 用户新密码:                $_POST['newPwd']
     * 
     * @return json_encode($arr)
     * 没有验证密保答案就直接操作:{"result":"false_notset"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 重设密码失败,新旧密码一致: {"result":"failure"}
     * 重设密码成功:              {"result":"success"}
     */
    public function retrUserPwd(){
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->retrPwd($newPwd);
        echo $result;
    }

    /**
     * showUserInfo()用户显示用户信息
     * 
     * @return json_encode($arr)
     * 用户没有登录:              {"result":"false_unlogin"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 查询信息失败,没有教学班:   {"result":"failure"}
     * 查询信息成功:              {"result":$result}
     * 学生 $result={
     *         "id":"",
     *         "name":"",
     *         "question":"",
     *         "answer":"",
     *         "class":["",""]
     *      }
     * 老师 $result={
     *         "id":"",
     *         "name":"",
     *         "question":"",
     *         "answer":"",
     *         "class":["",""],
     *         "department":"",
     *         "job_title":"",
     *         "tel":"",
     *         "email":"",
     *         "achievement":"",
     *         "style":"",
     *         "publication":"",
     *         "reputation":""
     *      }
     */
    public function showUserInfo(){
        $user = new \app\index\model\UserModel();
        $result = $user->showInfo();
        echo $result;
    }

    /**
     * editUserInfo()用于修改用户信息
     * 
     * 函数的参数如下:
     *  密保问题:   $_POST['quest'];
     *  密保答案:   $_POST['ans'];
     *  部门:       $_POST['depart'];
     *  职称:       $_POST['job'];
     *  电话:       $_POST['tel'];
     *  电子邮箱:   $_POST['email'];
     *  科研成果:   $_POST['achieve'];
     *  教学风格:   $_POST['style'];
     *  出版书籍:   $_POST['publication'];
     *  荣誉:       $_POST['reputation'];
     * @return json_encode($arr)
     * 用户没有登录:              {"result":"false_unlogin"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 修改信息失败:              {"result":"failure"}
     * 修改信息成功:              {"result":"success"}
     */
    public function editUserInfo(){
        $quest=$_POST['quest'];
        $ans=$_POST['ans'];
        $depart=$_POST['depart'];
        $job=$_POST['job'];
        $tel=$_POST['tel'];
        $email=$_POST['email'];
        $achieve=$_POST['achieve'];
        $style=$_POST['style'];
        $publication=$_POST['publication'];
        $reputation=$_POST['reputation'];

        $user = new \app\index\model\UserModel();
        $result = $user->editInfo($quest, $ans, $depart, $job, $tel, $email, $achieve, $style, $publication, $reputation);
        echo $result;
    }

    public function publishLearningEx(){
        $title=$_POST['title'];
        $content=$_POST['content'];

        $learning_ex=new \app\index\model\LearningExModel();
        $result = $learning_ex->publish($title,$content);
        echo $result;
    }


}
