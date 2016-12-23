<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/12/16
 * Time: 11:28
 */

namespace app\index\model;
use think\Model;
use think\Db;
class Homework extends Model
{
    public $class_id;
    public $homework_id;
    public $n_th;
    public $ddl;
    public $totalscore;
    public $count = 1;
    public $stu_id;
    public $do_score = 0;

    public function createHomework()
    {
        $this->homework_id = $this->class_id + $this->n_th;
        $arr = ['class_id' => $this->class_id, 'homework_id' => $this->homework_id, 'homework_th' => $this->n_th,
            'sum_grade' => 0, 'ddl' => $this->ddl];
        try {
            $result = Db::table('homework')->insert($arr);
            if ($result == 0) {
                echo "asdasdada";
            } else
                return 1;
        } catch (Exception $e) {

        }
    }
    public function insertQuestion1($score, $question, $option1, $option2, $option3, $option4, $answer)
    {
        ////////////////////////
        $q1 = new Question1();
        $arr=['homework_id'=>$this->homework_id,'ques_th'=>$this->count,'type'=>'1','question'=>$question,'grade'=>$score,'optionA'=>$option1,'optionB'=>$option2,'optionC'=>$option3,'optionD'=>$option4,'answer'=>$answer];
        Db::table('question1')->insert($arr);
        ////////////////////////////

        $q1->set($score, $question, $option1, $option2, $option3, $option4, $answer);
        $arr = ['homework_id' => $this->homework_id, 'ques_th' => $this->count, 'type' => '1', 'question' => $q1->question, 'answer' => $q1->answer, 'grade' => $score];
        echo $q1->question;
        if (Db::table('question')->insert($arr) == 0) {
            return 0;
        } else {
            $this->count++;
            $this->totalscore += $score;
            return 1;
        }
    }
    public function insertQuestion2($score, $question, $answer)
    {
        $arr = ['homework_id' => $this->homework_id, 'ques_th' => $this->count, 'type' => 2, 'question' => $question, 'answer' => $answer, 'grade' => $score];
        if (Db::table('question')->insert($arr) == 0) {
            return 0;
        } else {
            $this->count++;
            $this->totalscore += $score;
            return 1;
        }

    }
    public function getallhomework()
    {
        $result = Db::table('homework')->field('homework_th,ddl')->where('class_id', '=', $this->class_id)->select();
        return $result;
    }
    public function getallquestions1()
    {
        $result = Db::table('question1')->field('ques_th,question,answer,grade,optionA,optionB,optionC,optionD')->where('homework_id', '=', $this->homework_id)->where('type', '1')->select();
        return $result;
    }
    public function getallquestions2()
    {
        $result=Db::table('question')->field('ques_th,question,answer,grade')->where('homework_id','=',$this->homework_id)->where('type','2')->select();
        return $result;
    }
    public function initialDoHomework()
    {
        $result=Db::table('do_homework')->where('class_id',$this->class_id)->where('homework_id','=',$this->homework_id)->where('stu_id','=',$this->stu_id)->find();
        if($result)
        {
            return 0;
        }
        else
        {
            $arr=['homework_id'=>$this->homework_id,'finish'=>1,'stu_id'=>$this->stu_id,'grade1'=>0,'grade2'=>0];
            Db::table('do_homework')->insert($arr);
            return 1;
        }
    }
    public function correctquestion($th,$stu_answer)
    {
        $answer=Db::table('question')->where('homework_id','=',$this->homework_id)->where('ques_th','=',$th)->find();
        if($answer['answer']==$stu_answer)
        {
             $this->do_score=$this->do_score+$answer['grade'];
        }
        else;   //答案错误
    }
    public function submitques2($ques_th,$stu_answer)
    {
        $arr=['homework_id'=>$this->homework_id,'stu_id'=>$this->stu_id,'ques_th'=>$ques_th,'answer'=>$stu_answer];
        $result=Db::table('do_question')->insert($arr);
        if(!$result)
        {
            echo '非自动批改作业插入数据库失败';
        }
    }
    public function updategrade1()
    {
        Db::table('do_homework')->where('homework_id',$this->homework_id)->where('stu_id',$this->stu_id)->update(['grade1'=>$this->do_score]);
    }
    
}