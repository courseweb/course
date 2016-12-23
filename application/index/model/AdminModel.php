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
                    ['teach e', 'a.class_id=e.class_id'],
                    ['teacher f','e.t_id=f.t_id']
                ];
                $result = Db::table('class')->alias('a')->join($join)->field('a.semester,a.year,a.section_id,d.subject,f.t_name,a.class_id')->select();

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
                        if($teacher[$i]){
                            $arr[$index]['year'] = $result[$i]['year'];
                            $arr[$index]['semester'] = $result[$i]['semester'];
                            $arr[$index]['class'] = $result[$i]['subject'].'-'.$teacher[$i].'-'.$result[$i]['section_id'].'班';
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
            $data[]=[
                'stu_id'=>$value[0],
                'stu_name'=>$value[1],
                'stu_pwd'=>$pwd
            ];
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
        return $result;
    }

    public function clearStudents(){
        
    }
}