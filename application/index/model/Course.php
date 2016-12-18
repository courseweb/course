<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/12/17
 * Time: 16:32
 */

namespace app\index\model;
use think\Db;
use think\Model;

class Course extends Model
{
    public $course_id;
    public $subject;
    public $credits;
    public $teach_hourse;
    public $outline;
    public $textbook;
    public $background;
    public $assess;
    public $prerequ;
    public $description;
    public $project;
    public function getDecription()
    {
        $result = Db::table('course')->field("description")->where('course_id','=',$this->course_id)->find();
        return $result;
    }

}