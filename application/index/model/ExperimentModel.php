<?php
namespace app\index\model;
use think\Model;
use think\Db;
class ExperimentModel extends Model
{
    public function getComment(){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="1"){
                if (session('?class_id')) {
                    $class_id=session('class_id');
                    $join = [
                        ['experiment b','a.class_id=b.class_id and a.n_th=b.n_th']
                    ];
                    $result = Db::table('do_experiment')->alias('a')->join($join)->where('b.class_id',$class_id)->where('a.stu_id',$id)->field('b.n_th,a.score as given_score,b.sum_grade as total_score,a.comment as remark')->order('n_th')->select();
                    if(!$result){
                        $result='failure';
                    }
                }else{
                    $result='false_noClassID';
                }
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        return json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function showAns($n_th){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="2"){
                if (session('?class_id')) {
                    $class_id=session('class_id');

                    $join=[
                        ['student b','b.stu_id=a.stu_id']
                    ];
                    $result = Db::table('do_experiment')->alias('a')->join($join)->where('a.class_id',$class_id)->where('n_th',$n_th)->field('a.stu_id as studentID,b.stu_name as studentName,a.url as URL')->select();
                    session('experiment_th',$n_th);
                }else{
                    $result='false_noClassID';
                }
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }

        $arr = array('result' => $result);
        return json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function setComment($json){
        $array = json_decode($json);
        $commentArr=array();
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type==2){
                if (session('class_id')) {
                    $class_id=session('class_id');
                    if(session('?experiment_th')){
                        $experiment_th=session('experiment_th');
                        for($i=0;$i<count($array);$i++){
                            $stu_id=$array[$i]->studentID;
                            $score=$array[$i]->score;
                            $comment=$array[$i]->comment;

                            $result=Db::table('do_experiment')->where('class_id',$class_id)->where('n_th',$experiment_th)->where('stu_id',$stu_id)->update(['score'=>$score,'comment'=>$comment]);
                        }
                        $result="success";
                    }else{
                        $result="false_noExperimentTh";
                    }
                }else{
                    $result="false_noClassID";
                }
            }else{
                $result="false_type";
            }
        }else{
            $result="false_unlogin";
        }
        session('experiment_th',null);
        $arr = array('result' => $result);
        return json_encode($array,JSON_UNESCAPED_UNICODE);
    }
}