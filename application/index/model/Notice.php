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
        $arr=Db::table('course_notice')->where('class_id',$this->class_id)->where('notice_id','>=',$this->notice_time)->where('notice_id','<',$this->notice_id+6)->select();

        return $arr;
    }
    public function insertNotice()
    {
        $arr=['class_id'=>$this->class_id,'notice_id'=>$this->notice_id,'title'=>$this->title,
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
        $arr= Db::table('course_notice')->where('class_id',$this->class_id)->column('noice_id');
        $count=count($arr);
        $count=$count+1;
        return $count;
    }
    public function deleteOne()
    {
        $result=Db::table('couse_notice')->where('class_id',$this->class_id)->where('notice_id',$this->notice_id)->delete();
        return result;
    }

}