<?php
namespace app\index\model;
use think\Model;
use think\Db;
class UserModel extends Model
{
    public function login($id,$pwd,$type){
        if($type=="1"||$type=="2"||$type=="3"){
            if($type=="1"){
                $user='student'; $id_str='stu_id'; $pwd_str='stu_pwd';
            }else if($type=="2"){
                $user='teacher'; $id_str='t_id'; $pwd_str='t_pwd';
            }else if($type=="3"){
                $user='admin'; $id_str='admin_id'; $pwd_str='admin_pwd';
            }
            
            $result=Db::table($user)->where($id_str,$id)->find();
            if (!$result) { 
                $result='false_id';
            }else{
                $result=Db::table($user)->where($id_str,$id)->where($pwd_str,$pwd)->find();
                if (!$result) {
                    $result="false_pwd";
                }else{
                    $result='success';
                    session('usr_id',$id);
                    session('usr_type',$type);
                    session('login',true);
                }
            } 
        }else{
            $result='false_type';
        }

        $arr = array('result' => $result);
        return json_encode($arr);
    }

    public function editPwd($pwd,$newPwd){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="1"){
                $user = 'student'; $id_str='stu_id'; $pwd_str='stu_pwd';
            }else if($type=="2"){
                $user = 'teacher'; $id_str='t_id'; $pwd_str='t_pwd';
            }else if($type=="3"){
                $user = 'admin'; $id_str='admin_id'; $pwd_str='admin_pwd';
            }

            $result=Db::table($user)->where($id_str,$id)->where($pwd_str,$pwd)->find();
            if (!$result) { 
                $result='false_pwd';
            }else{
                $result=Db::table($user)->where($id_str,$id)->update([$pwd_str => $newPwd]);
                if(!$result){
                    $result='failure';
                }else{
                    $result='success';
                }
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        return json_encode($arr);
    }

    public function setQuest($quest,$ans){
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');

            if($type=="1"||$type=="2"){
                $quest_str = 'pwd_question'; $ans_str = 'pwd_answer';
                if($type=="1"){
                    $user = 'student'; $id_str = 'stu_id'; 
                }else if($type=="2"){
                    $user = 'teacher'; $id_str = 't_id';
                }
                $result=Db::table($user)->where($id_str,$id)->update([$quest_str => $quest,$ans_str=>$ans]);
                if(!$result){
                    $result="failure";
                }else{
                    $result="success";
                }
            }else{
                $result='false_type';
            }  
        }else{
            $result='false_unlogin';
        }            
        $arr = array('result' => $result);
        echo json_encode($arr); 
    }

    public function getQuest($id,$type){
        if($type=="1"||$type=="2"){
            $quest_str= 'pwd_question';
            if($type=="1"){
                $user = 'student';
                $id_str='stu_id';
            }else if($type=="2"){
                $user = 'teacher';
                $id_str='t_id';
            }

            $result=Db::table($user)->where($id_str,$id)->find();
            if (!$result) { 
                $result='false_id';
            }else{
                $result=Db::table($user)->where($id_str,$id)->value($quest_str);
                if (!$result) {
                    $result="false_quest";
                }else{
                    session('usr_id',$id);
                    session('usr_type',$type);
                }
            }
        }else{
            $result='false_type';
        }
        $arr = array("result" => $result);
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function veriAns($ans){
        if (session('?usr_id')) {
            $id=session('usr_id');
            $type=session('?usr_type');

            if($type=="1"||$type=="2"){
                if($type=="1"){
                    $user = 'student'; $id_str='stu_id'; $ans_str= 'pwd_answer';
                }else if($type=="2"){
                    $user = 'teacher'; $id_str='t_id'; $ans_str= 'pwd_answer';
                }
                $result=Db::table($user)->where($id_str,$id)->where($ans_str,$ans)->find();
                if (!$result) {
                    $result="failure";
                }else{
                    $result="success";
                    session("veriAns",true);
                }
            }else{
                $result='false_type';
            }
        }else{
            $result='false_notset';
        }

        $arr = array('result' => $result);
        echo json_encode($arr);
    }

    public function retrPwd($newPwd){
        if (session('?usr_id')&&session('?veriAns')) {
            $id=session('usr_id');
            $type=session('?usr_type');

            if($type=="1"||$type=="2"){
                if($type=="1"){
                    $user = 'student'; $id_str='stu_id'; $pwd_str= 'stu_pwd';
                }else if($type=="2"){
                    $user = 'teacher'; $id_str='t_id'; $pwd_str= 't_pwd';
                }
                $result=Db::table($user)->where($id_str,$id)->update([$pwd_str=>$newPwd]);
                if (!$result) {
                    $result="failure";
                }else{
                    $result="success";
                }
            }else{
                $result='false_type';
            }
            session('veriAns', null);
        }else{
            $result='false_notset';
        }

        $arr = array('result' => $result);
        echo json_encode($arr);
    }

    //未完
    public function showInfo(){
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');

            if($type=="1"||$type=="2"){
                if($type=="1"){
                    $user = 'student';

                    $join = [
                        ['take b','a.stu_id=b.stu_id'],
                        ['class c','b.class_id=c.class_id'],
                        ['course d', 'c.course_id=d.course_id'],
                        ['teach e', 'c.class_id=e.class_id'],
                        ['teacher f','e.t_id=f.t_id']
                    ];
                    $result = Db::table($user)->alias('a')->join($join)->where('a.stu_id',$id)->field('a.stu_name,a.pwd_question,a.pwd_answer,c.section_id,d.subject,f.t_name')->find();

                    if(!$result){
                        $result = 'failure';
                    }else{
                        $result = array('id' => $id, '');
                    }
                }else if($type=="2"){
                    $user = 'teacher';
                }
                $result=Db::table($user)->where($id_str,$id)->update([$quest_str => $quest,$ans_str=>$ans]);
                if(!$result){
                    $result="failure";
                }else{
                    $result="success";
                }
            }else{
                $result='false_type';
            }  
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => result);
        echo json_encode($arr);
    }
}
?>
