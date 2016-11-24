<?php
namespace app\index\controller;
use think\Controller;
class User extends Controller
{
    /** 
    * login()函数用登录
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
    * @author 李永杰<2382457262@qq.com>
    * @version 1.0
    * @return json_encode
    */  
    public function login(){
        $id=$_POST['id'];
        $pwd=md5($_POST['pwd']);
        $type=$_POST['type'];
        
        if($type=="1"||$type=="2"||$type=="3"){
            if($type=="1"){
                $user= new \app\index\model\Student();
                $id_str='stu_id';
                $pwd_str='stu_pwd';
            }else if($type=="2"){
                $user= new \app\index\model\Teacher();
                $id_str='t_id';
                $pwd_str='t_pwd';
            }else if($type=="3"){
                $user= new \app\index\model\Admin();
                $id_str='admin_id';
                $pwd_str='admin_pwd';
            }
            if (!$user->where($id_str,$id)->find()) { 
                $result='false_id';
            }else if (!$user->where($id_str,$id)->where($pwd_str,$pwd)->find()) {
                $result="false_pwd";
            }else{
                $result='success';
                session('usr_id',$id);
                session('usr_type',$type);
            }
        }else{
            $result='false_type';
        }

        $arr = array('result' => $result);
        return json_encode($arr);
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
    * @author 李永杰<2382457262@qq.com>
    * @version 1.0
    * @return json_encode
    */  
    public function editPwd(){
        if(session('?usr_id')){
            $id=session('usr_id');
            $type=session('usr_type');
            $pwd=md5($_POST['pwd']);
            $newPwd=md5($_POST['newPwd']);
            if($type=="1"){
                $user= new \app\index\model\Student();
                $id_str='stu_id';
                $pwd_str='stu_pwd';
            }else if($type=="2"){
                $user= new \app\index\model\Teacher();
                $id_str='t_id';
                $pwd_str='t_pwd';
            }else if($type=="3"){
                $user= new \app\index\model\Admin();
                $id_str='admin_id';
                $pwd_str='admin_pwd';
            }
            if (!$user->where($id_str,$id)->where($pwd_str,$pwd)->find()) { 
                $result='false_pwd';
            }else if(!$user->where($id_str,$id)->update([$pwd_str => $newPwd])){
                $result='failure';
            }else{
                $result='success';
            }
        }else{
            $result='false_unlogin';
        }

        $arr = array('result' => $result);
        return json_encode($arr);
    }
}
?>