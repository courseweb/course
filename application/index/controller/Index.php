<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\Exampaper;
use app\index\model\Notice;
use app\index\model\Slides;
use app\index\model\Homework;
use app\index\model\Template;
use app\index\model\Course;

class Index extends Controller
{
    public function index()
    {
        return $this->fetch();
    }


    public function login()
    {
        //        $id=$_POST['id'];
//        $pwd=$_POST['pwd'];
//        session('id',$id);
//        session('pwd',$pwd);
//        session('class_id','1');
        $arry=array('result' => 'success');
        $vas=date("Y-m-d h:i:s");
        echo $vas;
    }
    public function getCourseInfo()
    {
        $p=new Course();
//        $p->course_id=session('course_id');
        $p->course_id='12345601';
        $result=$p->getDecription();
        echo urldecode(json_encode($result, JSON_FORCE_OBJECT));
    }
    public function getAllTitles()
    {
        $p=new Notice();
        // $p->class_id=session('class_id');
        $p->notice_time=$_POST['notice_time'];
        $p->class_id="12345601";
        $arr=$p->getAlltitles();
//        print_r($arr);
        //echo urldecode ( json_encode($arr, JSON_FORCE_OBJECT) );
        echo json_encode($arr, JSON_FORCE_OBJECT);
    }
    public function addNotice()
    {
        $p=new Notice();
        $p->class_id=$_POST["class_id"];
        $p->title=$_POST['notice_title'];
        $p->content=$_POST['notice_content'];
        $p->release_time=date("Y-m-d h:i:s");
        $p->notice_id==$p->getNoticeId();
        // $result='success';
        if ($p->insertNotice()==0) {
            echo '添加失败';
        } else {
            echo '添加成功';
        }
    }
    public function getNoticeContent()
    {
        $notice_id = $_POST['notice_id'];
        $p = new Notice();
        $str = $p->getContent();
        $arr = array('result' => $str);
        echo urldecode(json_encode($arr, JSON_FORCE_OBJECT));
    }
    public function deleteNotice()
    {
        $p = new Notice();
        $p->notice_id = $_POST['notice_id'];
        $p->class_id =1;
//        $p->class_id = $_POST['class_id'];
        if ($p->deleteOne()==0) {
            echo "条目已删除";
        } else {
            echo "删除成功";
        }
    }
    public function modifyNotice()
    {
        $p=new Notice();
//        $p->class_id=$_POST("class_id");
        $p->class_id="1";
        $p->notice_id=$_POST['notice_id'];
        $p->title=$_POST['notice_title'];
        $p->content=$_POST['notice_content'];
        $p->release_time=date("Y-m-d h:i:s");
        $p->deleteOne();
        if ($p->insertNotice()==0) {
            echo 'Failure';
        } else {
            echo 'Success';
        }
    }
    public function uploadSlides()
    {
        $p=new Slides();
//         $p->class_id=session("class_id");
        $p->class_id='1';
        $p->n_th=$_POST["n_th"];
        //$p->class_id="1";
        //$p->n_th="1";
        if (!$p->storeindisk()) {
            exit();
        }
        if ($p->storeindb()) {
            echo "上传成功";
        } else {
            echo "文件重复上传";
        }
    }
    public function getAllSlides()
    {
        //        $class_id=session("class_id");
//        $dir="./resource/$class_id/slides";
//        if(!is_dir($dir))
//        {
//            echo "This Class haven't uploaded any slides!";
//            exit();
//        }
//        $arr = array();
//        if ($headle=opendir($dir)){
//            while ($file=readdir($headle)){
//                $file=iconv("gb2312","utf-8",$file);
//                if ($file!='.' &&  $file!='..')
//                {
//                    array_push($arr,$file);
//                }
//            }
//            closedir($headle);
//        }
        $p=new Slides();
        $p->class_id="1";
        $arr=$p->getall();
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function downloadSlides()
    {
        $class_id=session("class_id");
        $filename=$_POST("filename");
        $address="resource/$class_id/slides/$filename";
        echo $address;
    }
    public function uploadExampaper()
    {
        $p=new Exampaper();
        $p->class_id=session("class_id");
        if (!$p->storeindisk()) {
            echo "存入磁盘失败";
        }
    }
    public function downloadExampaper()
    {
        $class_id=session("class_id");
        $filename=$_POST("filename");
        $address="resource/$class_id/Exampaper/$filename";
        echo $address;
    }
    public function getAllExampaper()
    {
        $class_id=session("class_id");
        $dir="./resource/$class_id/Exampaper";
        if (!is_dir($dir)) {
            echo "This Class haven't uploaded any Exampaper!";
            exit();
        }
        $arr = array();
        if ($headle=opendir($dir)) {
            while ($file=readdir($headle)) {
                $file=iconv("gb2312", "utf-8", $file);
                if ($file!='.' &&  $file!='..') {
                    array_push($arr, $file);
                }
            }
            closedir($headle);
        }
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function getAllVideo()
    {
        $p=new Video();
//        $p->class_id=session("class_id");
        $p->class_id='1';
        $p->getall();
    }
    public function uploadVideo()
    {
        $p=new Video();
        $p->class_id=session("class_id");
        $p->n_th=$_POST("n_th");
        //$p->class_id="1";
        //$p->n_th="1";
        if (!$p->storeindisk()) {
            exit();
        }
        if ($p->storeindb()) {
            echo "上传成功";
        } else {
            echo "文件重复上传";
        }
    }
    public function getVideoByn_th()
    {
        $p=new Video();
        $p->class_id=session("class_id");
        $p->n_th=$_POST("n_th");
        if ($p->getbyn_th()) {
            $arr=$p->arry;
            echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
        } else {
            echo 'fail!';
        }
    }
    public function getAllTemplate()
    {
        //        $class_id=session("class_id");
//        $dir="./resource/$class_id/Template";
//        if(!is_dir($dir))
//        {
//            echo "This Class haven't uploaded any Template!";
//            exit();
//        }
//        $arr = array();
//        if ($headle=opendir($dir)){
//            while ($file=readdir($headle)){
//                $file=iconv("gb2312","utf-8",$file);
//                if ($file!='.' &&  $file!='..')
//                {
//                    array_push($arr,$file);
//                }
//            }
//            closedir($headle);
//        }
        $p=new Template();
//        $p->class_id=session['class_id'];
        $p->class_id='1';
        $arr=$p->getall();
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function uploadTemplate()
    {
        $p=new Template();
//        $p->class_id=session("class_id");
        $p->class_id="1";
        $p->n_th=$_POST["n_th"];
        $p->ddl=$_POST["DDL"];
        if (!$p->storeindisk()) {
            echo "插入硬盘失败";
        }
        if (!$p->storeindatabase()) {
            echo "插入数据库失败";
        }
    }
    public function downloadTemplate()
    {
        $class_id=session("class_id");
        $filename=$_POST("filename");
        $address="resource/$class_id/Exampaper/$filename";
        echo $address;
    }
    public function deleteTemplate()
    {
        $p=new Template();
        $p->class_id='1';
        $p->n_th=$_POST['n_th'];
        $p->deleteone();
    }
    public function issueOnlineHomework()
    {
        $p=new Homework();
        $p->class_id='1';
        $p->ddl=$_POST['DDL'];
        $p->n_th=$_POST['homeworkTime'];
        if ($p->createHomework()==0) {
            //homework 之前已经布置过

            echo "作业已提交，无法重复提交";
        } else {
        }
        $homework=$_POST['homeworkArray'];
        $arr=json_decode($homework, true);
        $row=array();
        foreach ($arr as $row) {
            $type=$row["questionType"];
            if ($type==1) {
                //选择题

                if ($p->insertQuestion1($row['chooseScore'], $row['chooseQuestion'], $row['chooseAnswerA'], $row['chooseAnswerB'], $row['chooseAnswerC'], $row['chooseAnswerD'], $row['rightQuestionAnswer'])==1) {
                } else {
                    echo "插入失败";
                }
            } elseif ($type==2) {
                //问答题

                if ($p->insertQuestion2($row['fillInScore'], $row['fillInQuestion'], $row['$fillInAnswer'])==1) {
                } else {
                    echo "插入失败";
                }
            }
        }
    }
    public function doOnlineQuestion()
    {
    }
    public function doExperiment()
    {
        $p=new Report();
        $p->class_id=session['class_id'];//session('class_id')括号，慢慢改吧。
        $p->stu_id  =session['stu_id'];
        $p->n_th=$_POST['n_th'];
        $p->submitreport();
    }
    public function downloadReport()
    {
        $p=new Report();
        $p->class_id=session['class_id'];
        $p->stu_id  =session['stu_id'];
        $p->n_th=$_POST['n_th'];
        $addr=$p->downloadreport();
        echo $addr;
    }
    public function getAllHomework()
    {
        $p=new Homework();
//        $p->class_id=session['class_id'];
        $p->class_id='1234560101';
        $arr=$p->getAllHomework();
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function getAllQuestion1()
    {
        $p=new Homework();
//        $p->class_id=session['class_id'];
        $p->homework_id='1234010101';
        $arr=$p->getallquestions1();
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function getAllQuestion2()
    {
        $p=new Homework();
//        $p->class_id=session['class_id'];
        $p->homework_id='1234010101';
        $arr=$p->getallquestions2();
        echo urldecode(json_encode($arr, JSON_UNESCAPED_UNICODE));
    }
    public function submitQuestions()
    {
        $p=new Homework();
        $p->homework_id=$_POST['homework_id'];
        $p->stu_id=$_POST['stu_id'];
        $questions=$_POST['questionSet'];
        $arr=json_decode($questions, true);
        $row=array();
        if ($p->initialDoHomework()==0) {
            echo "作业已经提交，无法更改！";
        } else {
            foreach ($arr as $row) {
                $type=$row["questionType"];
                if ($type==1) {
                    //选择题

                    $p->correctquestion($row['n_th'], $row['answer']);
                } elseif ($type==2) {
                    //问答题

                    $p->doquestion2();
                }
            }
            $p->updategrade1();
        }
    }


    /**
     * loginUser()用于登录
     *
     * 函数的参数如下
     * 用户id:      $_POST['id']
     * 用户类型:    $_POST['type'],{学生=1,老师=2,管理员=3}
     * 用户密码:    $_POST['pwd']
     *
     * @return json_encode($arr)
     * 类型错误:    {"result":"false_type"}
     * 账号错误:    {"result":"false_id"}
     * 密码错误:    {"result":"false_pwd"}
     * 登录成功:    {"result":"success"}
     */
    public function loginUser()
    {
        $id=$_POST['id'];
        $pwd=md5($_POST['pwd']);
        $type=$_POST['type'];

        $user = new \app\index\model\UserModel();
        $result = $user->login($id, $pwd, $type);
        echo $result;
    }

    /**
     * editUserPwd()用于在登录之后修改密码
     *
     * 函数的参数如下
     * 用户旧密码:    $_POST['pwd']
     * 用户新密码:    $_POST['newPwd']
     *
     * @return json_encode($arr)
     * 未登录:        {"result":"false_unlogin"}
     * 旧密码错误:    {"result":"false_pwd"}
     * 修改新密码失败:{"result":"failure"}
     * 修改新密码成功:{"result":"success"}
     */
    public function editUserPwd()
    {
        $pwd=md5($_POST['pwd']);
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->editPwd($pwd, $newPwd);
        echo $result;
    }

    /**
     * getUserQuest()用于获取用户的密保问题
     *
     * 函数的参数如下
     * 用户id:                 $_POST['id']
     * 用户类型:               $_POST['type']
     *
     * @return json_encode($arr)
     * 账户类型错误:           {"result":"false_type"}
     * 问题为空,查询结果不存在:{"result":"false_quest"}
     * 用户id错误,没有该id:    {"result":"false_id"}
     * 获取成功,返回问题内容:  {"result":$result}
     *     $result="";
     */
    public function getUserQuest()
    {
        $id=$_POST['id'];
        $type=$_POST['type'];

        $user = new \app\index\model\UserModel();
        $result = $user->getQuest($id, $type);
        echo $result;
    }

    /**
     * veriUserAns()用于验证用户密保答案
     *
     * 函数的参数如下
     * 密保答案:                       $_POST['ans']
     *
     * @return json_encode($arr)
     * 没有获取密保问题,无法得知用户id:{"result":"false_notset"}
     * 用户类型错误,只有老师学生可操作:{"result":"false_type"}
     * 验证密保答案失败:               {"result":"failure"}
     * 验证密保答案成功:               {"result":"success"}
     */
    public function veriUserAns()
    {
        $ans=$_POST['ans'];

        $user = new \app\index\model\UserModel();
        $result = $user->veriAns($ans);
        echo $result;
    }

    /**
     * retrUserPwd()用于重设用户密码
     *
     * 函数参数如下
     * 用户新密码:                $_POST['newPwd']
     *
     * @return json_encode($arr)
     * 没有验证密保答案就直接操作:{"result":"false_notset"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 重设密码失败,新旧密码一致: {"result":"failure"}
     * 重设密码成功:              {"result":"success"}
     */
    public function retrUserPwd()
    {
        $newPwd=md5($_POST['newPwd']);

        $user = new \app\index\model\UserModel();
        $result = $user->retrPwd($newPwd);
        echo $result;
    }

    /**
     * showUserInfo()用户显示用户信息
     *
     * @return json_encode($arr)
     * 用户没有登录:              {"result":"false_unlogin"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 查询信息失败,没有教学班:   {"result":"failure"}
     * 查询信息成功:              {"result":$result}
     * 学生 $result={
     *         "id":"",
     *         "name":"",
     *         "classnames":["",""]
     *      }
     * 老师 $result={
     *         "id":"",
     *         "name":"",
     *         "classnames":["",""],
     *         "department":"",
     *         "job_title":"",
     *         "tel":"",
     *         "email":"",
     *         "achievement":"",
     *         "style":"",
     *         "publication":"",
     *         "reputation":""
     *      }
     */
    public function showUserInfo()
    {
        $user = new \app\index\model\UserModel();
        $result = $user->showInfo();
        echo $result;
    }

    /**
     * editUserInfo()用于修改用户信息
     *
     * 函数的参数如下:
     *  部门:       $_POST['depart'];
     *  职称:       $_POST['job'];
     *  电话:       $_POST['tel'];
     *  电子邮箱:   $_POST['email'];
     *  科研成果:   $_POST['achieve'];
     *  教学风格:   $_POST['style'];
     *  出版书籍:   $_POST['publication'];
     *  荣誉:       $_POST['reputation'];
     * @return json_encode($arr)
     * 用户没有登录:              {"result":"false_unlogin"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 修改信息失败:              {"result":"failure"}
     * 修改信息成功:              {"result":"success"}
     */
    public function editUserInfo()
    {
        $depart=$_POST['depart'];
        $job=$_POST['job'];
        $tel=$_POST['tel'];
        $email=$_POST['email'];
        $achieve=$_POST['achieve'];
        $style=$_POST['style'];
        $publication=$_POST['publication'];
        $reputation=$_POST['reputation'];

        $user = new \app\index\model\UserModel();
        $result = $user->editInfo($depart, $job, $tel, $email, $achieve, $style, $publication, $reputation);
        echo $result;
    }

    /**
     * setUserQuest()用于修改用户密保
     *
     * 函数的参数如下：
     *  密保问题:$_POST['quest'];
     *  密保答案:$_POST['ans'];
     * @return json_encode($arr)
     * 用户没有登录:{"result":"false_unlogin"}
     * 老师学生以外的用户进行操作:{"result":"false_type"}
     * 修改信息失败:{"result":"failure"}
     * 修改信息成功:{"result":"success"}
     */
    public function setUserQuest()
    {
        $quest=$_POST['quest'];
        $ans=$_POST['ans'];

        $user = new \app\index\model\UserModel();
        $result = $user->setQuest($quest, $ans);
        echo $result;
    }

    public function showUserQuest()
    {
        $user = new \app\index\model\UserModel();
        $result = $user->showQuest();
        echo $result;
    }

    public function publishLearningEx()
    {
        $title=$_POST['title'];
        $content=$_POST['content'];

        $learning_ex=new \app\index\model\LearningExModel();
        $result = $learning_ex->publish($title, $content);
        echo $result;
    }

    public function editLearningEx()
    {
        $title=$_POST['title'];
        $content=$_POST['content'];
        $id=$_POST['id'];

        $learning_ex=new \app\index\model\LearningExModel();
        $result = $learning_ex->edit($id, $title, $content);
        echo $result;
    }

    public function deleteLearningEx()
    {
        $id=$_POST['id'];

        $learning_ex=new \app\index\model\LearningExModel();
        $result = $learning_ex->deleteEx($id);
        echo $result;
    }

    public function getLearningExTitles()
    {
        $pageNum=$_POST['start_num'];

        $learning_ex=new \app\index\model\LearningExModel();
        $result = $learning_ex->getTitles($pageNum);

        echo $result;
    }

    public function showHomeworkBlankAns()
    {
        $homework_th=$_POST['onlineHomeworkTime'];

        $homework=new \app\index\model\HomeworkModel();
        $result = $homework->showBlankAns($homework_th);

        echo $result;
    }

    public function setHomeworkBlankComment()
    {
        $json = $_POST['onlineHomeworkComment'];

        $homework=new \app\index\model\HomeworkModel();
        $result = $homework->setComment($json);

        echo $result;
    }

    public function showExperimentAns()
    {
        $n_th=$_POST['reportHomeworkTime'];

        $experiment=new \app\index\model\ExperimentModel();
        $result = $experiment->showAns($n_th);

        echo $result;
    }

    public function setExperimentComment()
    {
        $json = $_POST['reportHomeworkComment'];

        $experiment=new \app\index\model\ExperimentModel();
        $result = $experiment->setComment($json);

        echo $result;
    }

    public function getHomeworkComment()
    {
        $homework=new \app\index\model\HomeworkModel();
        $result = $homework->getComment();

        echo $result;
    }

    public function getExperimentComment()
    {
        $experiment=new \app\index\model\ExperimentModel();
        $result = $experiment->getComment();

        echo $result;
    }


    public function getHomeworkTracer()
    {
        $homework=new \app\index\model\HomeworkModel();
        $result = $homework->getTracer();

        echo $result;
    }

    public function getExperimentTracer()
    {
        $experiment=new \app\index\model\ExperimentModel();
        $result = $experiment->getTracer();

        echo $result;
    }

    public function getAdminClassInfo()
    {
        $admin=new \app\index\model\AdminModel();
        $result = $admin->getClassInfo();

        echo $result;
    }

    public function addAdminStudents()
    {
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');
            if ($type=="3") {
                $file = request()->file('excel');
                $class_id = request()->param('class_id');

                $admin=new \app\index\model\AdminModel();
                $saveName= "resource/temp". DS . $admin->uploadTemp($file);
                $stuArr = $admin->importExcel($saveName);
                $result = $admin->addStudents($stuArr, $class_id);
            } else {
                $result="false_type";
            }
        } else {
            $result="false_unlogin";
        }
        $arr = array('result' => $result);
        echo json_encode($arr);
    }

    public function addAdminStudent()
    {
        $stu_id=$_POST['stu_id'];
        $stu_name=$_POST['stu_name'];
        $class_id=$_POST['class_id'];

        $admin=new \app\index\model\AdminModel();
        $result = $admin->addStudent($stu_id, $stu_name, $class_id);

        echo $result;
    }

    public function deleteAdminStudent()
    {
        $stu_id=$_POST['stu_id'];

        $admin=new \app\index\model\AdminModel();
        $result = $admin->deleteStudent($stu_id);

        echo $result;
    }

    public function getAdminCourseInfo()
    {
        $admin=new \app\index\model\AdminModel();
        $result = $admin->getCourseInfo();

        echo $result;
    }

    public function addAdminClass()
    {
        $year=$_POST['year'];
        $semester=$_POST['semester'];
        $course_id=$_POST['course_id'];
        $time=$_POST['time'];

        $admin=new \app\index\model\AdminModel();
        $result = $admin->addClass($year, $semester, $course_id, $time);

        echo $result;
    }

    public function deleteAdminClass()
    {
        $class_id=$_POST['class_id'];

        $admin=new \app\index\model\AdminModel();
        $result = $admin->deleteClass($class_id);

        echo $result;
    }

    public function isStudent()
    {
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');
            if ($type=="1") {
                $result=true;
            } else {
                $result=false;
            }
        } else {
            $result=false;
        }
        $arr = $result;
        echo json_encode($arr);
    }

    public function isTeacher()
    {
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');
            if ($type=="2") {
                $result=true;
            } else {
                $result=false;
            }
        } else {
            $result=false;
        }
        $arr = $result;
        echo json_encode($arr);
    }

    public function isAdmin()
    {
        if (session('?login')) {
            $id=session('usr_id');
            $type=session('usr_type');
            if ($type=="3") {
                $result=true;
            } else {
                $result=false;
            }
        } else {
            $result=false;
        }
        $arr = $result;
        echo json_encode($arr);
    }
}
