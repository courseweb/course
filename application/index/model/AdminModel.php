<?php
namespace app\index\model;
use think\Model;
use think\Db;
class AdminModel extends Model{
    public function getClassInfo(){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                $join = [
                    ['course d', 'a.course_id=d.course_id'],
                    ['teach e', 'a.class_id=e.class_id','left'],
                    ['teacher f','e.t_id=f.t_id','left']
                ];
                $result = Db::table('class')->alias('a')->join($join)->field('a.semester,a.year,a.time,d.subject,f.t_name,a.class_id')->select();

                if(!$result){
                    $result = 'failure';
                }else{
                    $teacher = array_column($result,'t_name');
                    for ($i = 0; $i < count($result); $i++) { 
                        for($j = 0;$j < $i; $j++){
                            if ($result[$i]['class_id']==$result[$j]['class_id'] AND $teacher[$i]) {
                                $teacher[$j]=$teacher[$j].'&'.$teacher[$i];
                                $teacher[$i]='';
                            }
                        }
                    }
                    $arr = array();
                    $index = 0;
                    for ($i = 0; $i < count($result); $i++) { 
                        $join = [
                            ['course d', 'a.course_id=d.course_id'],
                            ['teach e', 'a.class_id=e.class_id','left'],
                            ['teacher f','e.t_id=f.t_id','left']
                        ];
                        $judge = Db::table('class')->alias('a')->join($join)->where('a.class_id',$result[$i]['class_id'])->field('t_name,a.class_id')->select();
                        if(!$judge[0]['t_name']){
                            $teacher[$i]='暂无教师';
                        }

                        if($teacher[$i]){
                            $arr[$index]['year'] = $result[$i]['year'];
                            $arr[$index]['semester'] = $result[$i]['semester'];
                            $arr[$index]['classname'] = $result[$i]['subject'].'-'.$teacher[$i].'-'.$result[$i]['time'];
                            $arr[$index]['class_id'] = $result[$i]['class_id'];
                            $index++;
                        }
                    }
                    $result=$arr;
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

    //导入excel内容转换成数组 
    public function importExcel($filePath){
        import("Excel5",EXTEND_PATH.'PHPExcel/Reader');
        import("Excel2007",EXTEND_PATH.'PHPExcel/Reader');

        $PHPExcel = new \PHPExcel(); 

        /**默认用excel2007读取excel，若格式不对，则用之前的版本进行读取*/ 
        $PHPReader = new \PHPExcel_Reader_Excel2007(); 
        if(!$PHPReader->canRead($filePath)){ 
            $PHPReader = new \PHPExcel_Reader_Excel5(); 
            if(!$PHPReader->canRead($filePath)){ 
                echo 'no Excel'; 
                return; 
            } 
        } 

        $PHPExcel = $PHPReader->load($filePath); 
        $currentSheet = $PHPExcel->getSheet(0);  //读取excel文件中的第一个工作表
        $allColumn = $currentSheet->getHighestColumn(); //取得最大的列号
        $allRow = $currentSheet->getHighestRow(); //取得一共有多少行
        $erp_orders_id = array();  //声明数组

        /**从第二行开始输出，因为excel表中第一行为列名*/ 
        for($currentRow = 2;$currentRow <= $allRow;$currentRow++){ 

            /**从第A列开始输出*/ 
            for($currentColumn= 'A';$currentColumn<= $allColumn; $currentColumn++){ 

                $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65,$currentRow)->getValue();/**ord()将字符转为十进制数*/
                if($val!=''){
                    $erp_orders_id[$currentRow-1][] = $val;
                }
                /**如果输出汉字有乱码，则需将输出内容用iconv函数进行编码转换，如下将gb2312编码转为utf-8编码输出*/ 
                //echo iconv('utf-8','gb2312', $val)."\t"; 

            } 
        }
        return $erp_orders_id;
    }

    public function uploadTemp($file)
    {
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'resource/temp');
        if($info){
            // 成功上传后 获取上传信息
            // 输出 jpg
            // echo $info->getExtension();
            // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
            return $info->getSaveName();
            // 输出 42a79759f284b767dfcb2a0197904287.jpg
            // echo $info->getFilename();
        }else{
            // 上传失败获取错误信息
            echo $file->getError();
        }
    }

    public function addStudents($stuArr,$class_id){
        $result=Db::table('take')->where('class_id',$class_id)->delete();

        $pwd=md5("123456");
        $data=array();
        $take=array();
        foreach ($stuArr as $key => $value) {
            $result=Db::table('student')->where('stu_id',$value[0])->find();
            if(!$result){
                $data[]=[
                    'stu_id'=>$value[0],
                    'stu_name'=>$value[1],
                    'stu_pwd'=>$pwd
                ]; 
            }

            $take[]=[
                'class_id'=>$class_id,
                'stu_id'=>$value[0]
            ];
        }
        $result=Db::table('student')->insertAll($data);
        if(!$result){
            $result='false_insertStudent';
        }else{
            $result='success';
        }
        $result=Db::table('take')->insertAll($take);
        if(!$result){
            $result='false_insertTake';
        }else{
            $result='success';
        }
        $this->clearStudents();//删除没有教学班的学生
        return $result;
    }

    public function clearStudents(){
        $join=[['take b','a.stu_id=b.stu_id','left']];
        $result=Db::table('student')->join($join)->alias('a')->where('b.stu_id',NULL)->field('a.stu_id')->select();
        foreach ($result as $key => $value) {
            Db::table('do_experiment')->where('stu_id',$value['stu_id'])->delete();
            Db::table('do_question')->where('stu_id',$value['stu_id'])->delete();
            Db::table('do_homework')->where('stu_id',$value['stu_id'])->delete();
            Db::table('student')->where('stu_id',$value['stu_id'])->delete();
        }//这里简便起见只清理了数据库，没有清理学生上传的文件。
    }

    public function addStudent($stu_id,$stu_name,$class){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                $stu_pwd=md5("123456");
                $result=Db::table('student')->where('stu_id',$stu_id)->find();
                if($result){
                    $result=Db::table('student')->where('stu_id',$stu_id)->update(['stu_id'=>$stu_id,'stu_name'=>$stu_name,'stu_pwd'=>$stu_pwd]);
                }else{
                    $result=Db::table('student')->insert(['stu_id'=>$stu_id,'stu_name'=>$stu_name,'stu_pwd'=>$stu_pwd]);
                }

                $classArr=json_decode($class);
                foreach ($classArr as $key => $value) {
                    $result=Db::table('take')->where('stu_id',$stu_id)->where('class_id',$value)->find();
                    if(!$result){
                        $data=[
                            'stu_id'=>$stu_id,
                            'class_id'=>$value
                        ]; 
                        $result=Db::table('take')->insert($data);
                    }
                }
                $result="success";
            }else{
                $result="false_type";
            }
        }else{
            $result="false_unlogin";
        }
        $arr = array('result' => $result);
        return json_encode($arr);
    }

    public function deleteStudent($stu_id){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                Db::table('do_experiment')->where('stu_id',$stu_id)->delete();
                Db::table('do_question')->where('stu_id',$stu_id)->delete();
                Db::table('do_homework')->where('stu_id',$stu_id)->delete();
                Db::table('student')->where('stu_id',$stu_id)->delete();
                Db::table('take')->where('stu_id',$stu_id)->delete();
                //这里简便起见只清理了数据库，没有清理学生上传的文件。
                $result="success";
            }else{
                $result="false_type";
            }
        }else{
            $result="false_unlogin";
        }
        $arr = array('result' => $result);
        return json_encode($arr);
    }

    public function getCourseInfo(){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                $result=Db::table('course')->field('subject as course,course_id')->select();
            }else{
                $result='false_type';
            }
        }else{
            $result='false_unlogin';
        }
        $arr = array('result' => $result);
        return json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    public function addClass($year,$semester,$course_id,$time){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                $result=Db::table('class')->where('course_id',$course_id)->field('max(section_id) as max')->find();
                $section_id=$result['max']+1;
                $class_id = $course_id*100+$section_id;
                $result=Db::table('class')->insert([
                    'class_id'=>$class_id,
                    'course_id'=>$course_id,
                    'section_id'=>$section_id,
                    'time'=>$time,
                    'semester'=>$semester,
                    'year'=>$year,
                ]);
                if(!$result){
                    $result='failure';
                }else{
                    $result='success';
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

    public function deleteClass($class_id){
        if(session('?login')){
            $id=session('usr_id');
            $type=session('usr_type');
            if($type=="3"){
                Db::table('course_notice')->where('class_id',$class_id)->delete();
                Db::table('do_experiment')->where('class_id',$class_id)->delete();
                Db::table('experiment')->where('class_id',$class_id)->delete();
                Db::table('homework')->where('class_id',$class_id)->delete();
                Db::table('slides')->where('class_id',$class_id)->delete();
                Db::table('video')->where('class_id',$class_id)->delete();
                Db::table('take')->where('class_id',$class_id)->delete();
                Db::table('teach')->where('class_id',$class_id)->delete();
                Db::table('class')->where('class_id',$class_id)->delete();

                $join=[['homework b','a.homework_id=b.homework_id','left']];
                $result=Db::table('do_homework')->join($join)->alias('a')->where('b.homework_id',NULL)->field('a.homework_id')->select();
                foreach ($result as $key => $value) {
                    Db::table('do_question')->where('homework_id',$value['homework_id'])->delete();
                    Db::table('do_homework')->where('homework_id',$value['homework_id'])->delete();
                    Db::table('question')->where('homework_id',$value['homework_id'])->delete();
                    Db::table('question1')->where('homework_id',$value['homework_id'])->delete();
                }
                //这里简便起见只清理了数据库，没有清理上传的各种文件。
                $this->clearStudents();//删除没有教学班的学生
                $result="success";
            }else{
                $result="false_type";
            }
        }else{
            $result="false_unlogin";
        }
        $arr = array('result' => $result);
        return json_encode($arr);
    }
}