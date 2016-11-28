<?php
namespace app\index\model;
use think\Model;
use think\Db;
class LearningExModel extends Model
{
    public function publish($title,$content){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="2"){
                $result=Db::table('learning_ex')->where('t_id',$id)->order('release_time desc')->find();
                if($result){
                    $newest=$result['release_time'];
                    $current=date("Y-m-d H:i:s");
                    if(strtotime($current)-strtotime($newest)<=30){
                        $result = 'false_frequent';
                    }else if($result['title'] == $title AND $result['content'] == $content){
                        $result = 'false_same';
                    }else{
                        $result = 'fine';
                    }
                }else{
                    $result = 'fine';
                }

                if($result == 'fine'){
                    $str=array();
                    $str['t_id']=$id;
                    $str['title']=$title;
                    $str['content']=$content;
                    $str['release_time']=$current;
                    $result=Db::table('learning_ex')->insert($str);
                    if(!$result){
                        $result='failure';
                    }else{
                        $result='success';
                    }
                }
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        return json_encode($arr);
    }

    public function getTitles(){

    }
}