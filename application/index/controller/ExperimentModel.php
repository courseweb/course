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
}