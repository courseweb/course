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
    public function createHomework()
    {
        $this->homework_id=$this->class_id+$this->n_th;
        $arr=['class_id'=>$this->class_id,'homework_id'=>$this->homework_id,'homework_th'=>$this->n_th,
            'sum_grade'=>0,'ddl'=>$this->ddl];
        try
        {
            $result=Db::table('homework')->insert($arr);
            if($result==0)
            {
                echo "asdasdada";
            }
            else
                return 1;
        }
        catch (Exception $e)
        {
            
        }
    }
    public function insertQuestion1($score,$question,$option1,$option2,$option3,$option4,$answer)
    {
        $q1=new Question1();
        $q1->set($score,$question,$option1,$option2,$option3,$option4,$answer);
        $arr=['homework_id'=>$this->homework_id,'ques_th'=>$this->n_th,'type'=>'1','question'=>$q1->question,'answer'=>$q1->answer,'grade'=>$score];
        echo $q1->question;
        if(Db::table('question')->insert($arr)==0)
        {
            return 0;
        }
        else
        {
            $this->totalscore+=$score;
            return 1;
        }
    }
    public function insertQuestion2($score,$question,$answer)
    {
        $arr=['homework_id'=>$this->homework_id,'ques_th'=>$this->n_th,'type'=>2,'question'=>$question,'answer'=>$answer,'grade'=>$score];
        if(Db::table('question')->insert($arr)==0)
        {
            return 0;
        }
        else
        {
            $this->totalscore+=$score;
            return 1;
        }

    }
}