<?php
namespace app\index\model;
use think\Model;
use think\Db;
class HomeworkModel extends Model
{
    public function showBlankAns($homework_th){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="2"){
                if (session('?class_id')) {
                    $class_id=session('class_id');

                    $question = array();

                    $join = [
                        ['question b','b.homework_id=a.homework_id']
                    ];
                    $result = Db::table('homework')->alias('a')->join($join)->where('a.homework_th',$homework_th)->where('a.class_id',$class_id)->where(function ($query) {
                        $query->where('b.type',3)->whereor('b.type',4);
                    })->field('b.ques_th,b.question,b.answer,b.grade')->order('b.ques_th')->select();
                    if(!$result){
                        $result = 'failure';
                    }else{
                        foreach ($result as $index => $set) {
                            $temp=array();
                            $temp['ques_th']=$set['ques_th'];
                            $temp['question']=$set['question'];
                            $temp['std_answer']=$set['answer'];
                            $temp['grade']=$set['grade'];
                            $question[]=$temp;
                        }

                        $join = [
                            ['question b','b.homework_id=a.homework_id'],
                            ['do_question c','c.homework_id=a.homework_id'],
                            ['student d', 'd.stu_id=c.stu_id']
                        ];
                        $result = Db::table('homework')->alias('a')->join($join)->where('a.homework_th',$homework_th)->where('a.class_id',$class_id)->where(function ($query) {
                            $query->where('b.type',3)->whereor('b.type',4);
                        })->field('d.stu_id,d.stu_name,c.ques_th,c.answer')->order('b.ques_th')->distinct(true)->select();
                        if(!$result){
                            $result = 'failure';
                        }else{
                            foreach ($result as $index => $set) {
                                $question[$set['ques_th']-1]['answer'][]=array('stu_id'=>$set['stu_id'],'stu_name'=>$set['stu_name'],'answer'=>$set['answer']);
                            }
                            $result = $question;
                        }
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
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function getComment(){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="1"){
                if (session('?class_id')) {
                    $class_id=session('class_id');
                    $join = [['homework b','a.homework_id=b.homework_id']];
                    $result = Db::table('do_homework')->alias('a')->join($join)->where('b.class_id',$class_id)->where('a.stu_id',$id)->field('homework_th,a.grade as given_score,b.sum_grade as total_score,a.comment as remark')->order('homework_th')->select();
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