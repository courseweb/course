<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/12/17
 * Time: 17:18
 */

namespace app\index\model;


class Question1
{
    public $score;
    public $type;
    public $chooseQuestion;
    public $chooseAnswerA;
    public $chooseAnswerB;
    public $chooseAnswerC;
    public $chooseAnswerD;
    public $question;
    public $answer;
    public function set($score,$ques,$AA,$AB,$AC,$AD,$RA)
    {
        $this->score=$score;
        $this->chooseQuestion=$ques;
        $this->chooseAnswerA=$AA;
        $this->chooseAnswerB=$AB;
        $this->chooseAnswerC=$AC;
        $this->chooseAnswerD=$AD;
        $this->answer=$RA;
        $this->type=1;
        $this->question=$this->chooseQuestion;
    }
}