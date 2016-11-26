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

    public function showInfo(){
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');

            if($type=="1"){
                $user = 'student';

                $join = [
                    ['take b','a.stu_id=b.stu_id'],
                    ['class c','b.class_id=c.class_id'],
                    ['course d', 'c.course_id=d.course_id'],
                    ['teach e', 'c.class_id=e.class_id'],
                    ['teacher f','e.t_id=f.t_id']
                ];
                $result = Db::table($user)->alias('a')->join($join)->where('a.stu_id',$id)->field('a.stu_name,a.pwd_question,a.pwd_answer,c.section_id,d.subject,f.t_name,c.class_id')->select();

                if(!$result){
                    $result = 'failure';
                }else{
                    $teacher = array_column($result,'t_name');
                    for ($i = 0; $i < count($result); $i++) { 
                        for($j = 0;$j < $i; $j++){
                            if ($result[$i]['class_id']==$result[$j]['class_id'] AND $teacher[$i]) {
                                $teacher[$j]=$teacher[$j].'&'.$teacher[$i];
                                $teacher[$i]='';
                            }
                        }
                    }
                    $arr = array();
                    $index = 0;
                    for ($i = 0; $i < count($result); $i++) { 
                        if($teacher[$i]){
                            $arr[$index] = $result[$i]['subject'].'-'.$teacher[$i].'-'.$result[$i]['section_id'].'班';
                            $index++;
                        }
                    }
                    $result=array('id'=>$id,'name'=>$result[0]['stu_name'],'question'=>$result[0]['pwd_question'],'answer'=>$result[0]['pwd_answer'],'class'=>$arr);
                }
            }else if($type=="2"){
                $user = 'teacher';

                $join = [
                    ['teach b', 'a.t_id=b.t_id'],
                    ['class d','b.class_id=d.class_id'],
                    ['course c', 'd.course_id=c.course_id']
                ];
                $result = Db::table($user)->alias('a')->join($join)->where('a.t_id',$id)->field('a.t_id,t_name,pwd_question,pwd_answer,department,job_title,tel,email,achievement,style,publication,reputation,subject,section_id')->select();
                if(!$result){
                    $result = 'failure';
                }else{
                    $arr = array();
                    for ($i = 0; $i < count($result); $i++) {
                        $arr[$i] = $result[$i]['subject'].'-'.$result[$i]['section_id'].'班';
                    }
                    $result=array('id'=>$id,'name'=>$result[0]['t_name'],'question'=>$result[0]['pwd_question'],'answer'=>$result[0]['pwd_answer'],'class'=>$arr,'department'=>$result[0]['department'],'job_title'=>$result[0]['job_title'],'tel'=>$result[0]['tel'],'email'=>$result[0]['email'],'achievement'=>$result[0]['achievement'],'style'=>$result[0]['style'],'publication'=>$result[0]['publication'],'reputation'=>$result[0]['reputation'],);
                }
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function editInfo($quest, $ans, $depart, $job, $tel, $email, $achieve, $style, $publication, $reputation){
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');

            if($type=="1"){
                $str=array();
                if($quest AND $ans){
                    $str['pwd_question']    =   $quest;
                    $str['pwd_answer']      =   $ans;
                }
                $result=Db::table('student')->where('stu_id',$id)->update($str);
                if(!$result){
                    $result="failure";
                }else{
                    $result="success";
                }
            }else if($type=="2"){
                $str = array();
                if($quest AND $ans){
                    $str['pwd_question']    =   $quest;
                    $str['pwd_answer']      =   $ans;
                }
                if($depart)         $str['department']  =   $depart;
                if($job)            $str['job_title']   =   $job;
                if($tel)            $str['tel']         =   $tel;
                if($email)          $str['email']       =   $email;
                if($achieve)        $str['achievement'] =   $achieve;
                if($style)          $str['style']       =   $achieve;
                if($publication)    $str['publication'] =   $publication;
                if($reputation)     $str['reputation']  =   $reputation;
                $result=Db::table('teacher')->where('t_id',$id)->update($str);
                if(!$result) $result="failure";
                else $result="success";
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        echo json_encode($arr);
    }
}
?>
