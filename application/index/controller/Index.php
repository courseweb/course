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
    * login()函数用于登录
    * 
    * 函数的参数如下，POST方式参数需要前端传输
    * 用户id:POST['id']
    * 用户类型:POST['type'],{学生=1,老师=2,管理员=3}
    * 用户密码:POST['pwd']
    * 
    * 返回的语句有以下几种情况
    * 类型错误:false_type
    * 账号错误:false_id
    * 密码错误:false_pwd
    * 登录成功:success
    */  
    public function login(){
        $id=$_POST['id'];
        $pwd=md5($_POST['pwd']);
        $type=$_POST['type'];
         
        $user = new \app\index\model\UserModel();
        $result = $user->login($id,$pwd,$type);
        echo $result;
    }

    /** 
    * editPwd()函数用于在登录之后修改密码
    * 
    * 函数的参数如下，POST方式参数需要前端传输
    * 用户id:session('usr_id')
    * 用户类型:session('usr_type')
    * 用户旧密码:POST['pwd']
    * 用户新密码:POST['newPwd']
    * 
    * 返回的语句有以下几种情况
    * 未登录:false_unlogin
    * 旧密码错误:false_pwd
    * 修改新密码失败:failure
    * 修改新密码成功:success
    */  
    public function editPwd(){
        $pwd=md5($_POST['pwd']);
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->editPwd($pwd,$newPwd);
        echo $result;
    }

    public function setQuest(){
        $quest=$_POST['quest'];
        $ans=$_POST['ans'];

        $user = new \app\index\model\UserModel();
        $result = $user->setQuest($quest,$ans);
        echo $result;
    }

    public function getQuest(){
        $id=$_POST['id'];
        $type=$_POST['type'];

        $user = new \app\index\model\UserModel();
        $result = $user->getQuest($id,$type);
        echo $result;
    }

    public function veriAns(){
        $ans=$_POST['ans'];

        $user = new \app\index\model\UserModel();
        $result = $user->veriAns($ans);
        echo $result;
    }

    public function retrPwd(){
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->retrPwd($newPwd);
        echo $result;
    }

    public function showInfo(){
        $user = new \app\index\model\UserModel();
        $result = $user->showInfo();
        echo $result;
    }
}
