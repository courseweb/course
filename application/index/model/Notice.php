<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/11/23
 * Time: 21:15
 */
namespace app\index\model;
use think\Db;
use think\Model;

class Notice extends Model
{
    public  $class_id;
    public  $notice_id;
    public  $title;
    public  $content;
    public  $release_time;
    public  $notice_time;
    protected $table = 'course_notice';
    public function getAlltitles()
    {
        $start=$this->notice_time;
        $start=($start-1)/5+1;
        $arr=Db::table('course_notice')->where('class_id',"=",$this->class_id)->page($start,5)->select();
        print_r($arr);
        return $arr;
    }
    public function insertNotice()
    {
        $arr=['class_id'=>$this->class_id,'notice_id'=>$this->notice_id,'notice_title'=>$this->title,
            'content'=>$this->content,'release_time'=>$this->release_time];
        if(Db::table('course_notice')->insert($arr)==0)
        {
            return 0;
        }
        else
            return 1;
    }
    public function getContent()
    {
        $arr=Db::table('course_notice')->where('notice_id',$this->notice_id)->find();
        return $arr;
    }
    public function getNoticeId()
    {
        $arr= Db::table('course_notice')->where('class_id',$this->class_id)->column('notice_id');
        $result=0;
        foreach($arr as $value)
        {
                if($value>$result)
                {
                    $result=$value;
                }
        }
        $result=$result+1;
        return $result;
    }
    public function deleteOne()
    {
        $result=Db::table('course_notice')->where('class_id',$this->class_id)->where('notice_id',$this->notice_id)->delete();
        return $result;
    }
}