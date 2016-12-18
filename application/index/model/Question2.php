<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/12/17
 * Time: 17:18
 */

namespace app\index\model;


class Question2
{
    public $score;
    public $type;
    public $question;
    public $answer;
    public function set($s,$q,$a)
    {
        $this->score=$s;
        $this->question=$q;
        $this->answer=$a;
        $this->type=2;
    }
}