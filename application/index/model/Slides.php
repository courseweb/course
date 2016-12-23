<?php
/**
 * Created by PhpStorm.
 * User: c
 * Date: 2016/11/27
 * Time: 13:55
 */
namespace app\index\model;
use think\Model;
use think\Db;
class Slides extends Model
{
    public $class_id;
    public $filename;
    public $n_th;
    public $slidespath;
    public $arry;
    public function storeindisk()
    {
        $allowedExts = array("ppt", "pptx","pdf" ,"rar", "zip","doc","docx");
        $temp = explode(".", $_FILES["file"]["name"]);
        $extension = end($temp);     // 获取文件后缀名
        $reurl="localhost";   //此处需要修改
        if ((($_FILES["file"]["type"] == "application/vnd.ms-powerpoint")
            || ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.presentationml.presentation")
            || ($_FILES["file"]["type"] == "application/x-zip-compressed")
            || ($_FILES["file"]["type"] == "application/x-zip-compressed")
            || ($_FILES["file"]["type"] == "application/pdf")
            ||($_FILES["file"]["type"] == "application/octet-")
            || ($_FILES["file"]["type"] == "application/msword")
            || ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            && in_array($extension, $allowedExts)))
        {

            if ($_FILES ['file'] ['error'] > 0)
            {
                echo 'Problem: ';
                switch ($_FILES ['file'] ['error']) {
                    case 1 :
                        echo '上传文件过大:<a href='.$reurl.'>请重试</a>';
                        break;
                    case 2 :
                        echo '上传文件过大:<a href='.$reurl.'>请重试</a>';
                        break;
                    case 3 :
                        echo '文件上传丢失:<a href='.$reurl.'>请重试</a>';
                        break;
                    case 4 :
                        echo '无文件被上传:<a href='.$reurl.'>请重试</a>';
                        break;
                    case 6 :
                        echo '仅支持word和pdf文件，且文件大小小于512kb:<a href='.$reurl.'>请重试</a>';
                        break;
                    case 7 :
                        echo '上传文件存储失败:<a href='.$reurl.'>请重试</a>';
                        break;
                }
                exit ();
            }
            echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
            echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
            echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
            // echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";

            // 判断当期目录下的 upload 目录是否存在该文件
            // 如果没有 upload 目录，你需要创建它，upload 目录权限为 777
            if (!is_dir("resource/$this->class_id/")) mkdir("resource/$this->class_id/");
            if (!is_dir("resource/$this->class_id/slides/")) mkdir("resource/$this->class_id/slides/");
            $name=iconv("UTF-8","gb2312", $_FILES["file"]["name"]);
            $this->filename=$name;
            if (file_exists("resource/$this->class_id/slides/" . $name))
            {
                echo $_FILES["file"]["name"] . " 文件已经存在。 ";
                return 0;
            }
            else
            {
                // 如果 upload 目录不存在该文件则将文件上传到 upload 目录下
                move_uploaded_file($_FILES["file"]["tmp_name"], "resource/$this->class_id/slides/" .$name);
                echo "文件存储在: " . "resource/$this->class_id/slides/" . $_FILES["file"]["name"]."<br>";
                echo "success <br>";
            }
        }
        else
        {
            echo "非法的文件格式";
            return 0;
        }
        $this->filename= $_FILES["file"]["name"];
        $this->slidespath="resource/$this->class_id/slides/$this->filename";
        return 1;
    }
    public function storeindb()
    {
        $arr=['class_id'=>$this->class_id,'n_th'=>$this->n_th,'filename'=>$this->filename,
            'ppt_addr'=>$this->slidespath];
        if(Db::table('slides')->insert($arr)==0)
            return 0;
        else
            return 1;

    }
    public function getall()
    {
        $arr=Db::table('slides')->where('class_id',$this->class_id)->select();
        return $arr;
    }
}