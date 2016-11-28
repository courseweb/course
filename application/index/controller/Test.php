<?php

namespace app\index\controller;

use think\Controller;
use think\Db;
class Test extends Controller
{
    public function sparrow()
    {

        return $this->fetch();
    }

    public function swallow()
    {
        $this->getLearningExTitles();
        // $this->display('getLearningExTitles'); 
        return $this->fetch();
    }

    public function getLearningExTitles(){
        // 查询数据 并且每页显示10条数据
        $list = Db::table('learning_ex')->order('release_time desc')->paginate(5);
        // 把分页数据赋值给模板变量list
        $this->assign('list', $list);
    }
}
?>