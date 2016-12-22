-- MySQL dump 10.13  Distrib 5.7.9, for Win32 (AMD64)
--
-- Host: 115.28.173.183    Database: SECourseWebsite
-- ------------------------------------------------------
-- Server version	5.5.53-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+08:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` decimal(11,0) NOT NULL,
  `admin_pwd` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `class_id` decimal(10,0) NOT NULL COMMENT '教学班号',
  `course_id` decimal(8,0) NOT NULL COMMENT '课程号',
  `section_id` decimal(2,0) NOT NULL COMMENT '教学班次',
  `semester` varchar(10) DEFAULT NULL COMMENT '学期',
  `year` year(4) DEFAULT NULL COMMENT '学年',
  `exam_paper` varchar(50) DEFAULT NULL COMMENT '历年考试试卷',
  `ebook_addr` varchar(50) DEFAULT NULL COMMENT '电子教材',
  `supplyment` varchar(50) DEFAULT NULL COMMENT '补课资料',
  `t_essay` varchar(50) DEFAULT NULL COMMENT '老师交流文章',
  `good_job` varchar(50) DEFAULT NULL COMMENT '优秀作业',
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教学班';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `class_id` decimal(10,0) NOT NULL COMMENT '教学班id',
  `stu_id` decimal(11,0) NOT NULL COMMENT '学生id',
  `homework_th` int(11) NOT NULL COMMENT '第几次作业',
  `remarks` text COMMENT '评语',
  PRIMARY KEY (`class_id`,`stu_id`,`homework_th`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评语表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `course_id` decimal(8,0) NOT NULL COMMENT '课程号',
  `subject` varchar(40) NOT NULL COMMENT '课程名称',
  `credits` decimal(2,1) NOT NULL COMMENT '学分',
  `teach_hours` varchar(20) DEFAULT NULL COMMENT '课时安排',
  `outline` text COMMENT '教学计划',
  `textbook` text COMMENT '教材',
  `background` text COMMENT '国际国内背景',
  `assess` text COMMENT '考核方式',
  `prerequ` text COMMENT '预修课程',
  `project` text COMMENT '大作业介绍',
  `ex_template` varchar(50) DEFAULT NULL COMMENT '实验模版下载地址',
  `ex_num` int(11) DEFAULT NULL COMMENT '第几次实验',
  `ex_stu_report` varchar(50) DEFAULT NULL COMMENT '学生上传报告地址\n识别那一次实验和哪一次哪个学生写的实验报告都用文件名字来识别,存入的时候对文件重命名',
  `ex_ddl` datetime DEFAULT NULL COMMENT '实验ddl',
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_notice`
--

DROP TABLE IF EXISTS `course_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_notice` (
  `class_id` decimal(10,0) NOT NULL COMMENT '教学班',
  `notice_id` int(11) NOT NULL COMMENT '通知id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '通知内容',
  `release_time` datetime DEFAULT NULL COMMENT '发布日期',
  `delete_time` datetime DEFAULT NULL COMMENT '失效日期',
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程通知';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_notice`
--

LOCK TABLES `course_notice` WRITE;
/*!40000 ALTER TABLE `course_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `do_homework`
--

DROP TABLE IF EXISTS `do_homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `do_homework` (
  `homework_id` int(11) NOT NULL COMMENT '作业id\nHomework_id的组成是class_id % 10000 + homework_th*100',
  `stu_id` decimal(11,0) NOT NULL COMMENT '学生id',
  `grade` decimal(3,0) NOT NULL COMMENT '这名学生这次作业的分数',
  `finish` int(11) DEFAULT '0' COMMENT '完成度\n0未完成，1完成',
  PRIMARY KEY (`homework_id`,`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='写作业';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `do_homework`
--

LOCK TABLES `do_homework` WRITE;
/*!40000 ALTER TABLE `do_homework` DISABLE KEYS */;
/*!40000 ALTER TABLE `do_homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `do_question`
--

DROP TABLE IF EXISTS `do_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `do_question` (
  `homework_id` int(11) NOT NULL COMMENT '作业id\nHomework_id的组成是class_id % 10000 + homework_th*100',
  `stu_id` decimal(11,0) NOT NULL COMMENT '学生id',
  `ques_th` int(11) NOT NULL COMMENT '题号，第几题',
  `answer` text COMMENT '学生答案',
  `grade` decimal(3,0) DEFAULT '0' COMMENT '学生分数',
  PRIMARY KEY (`homework_id`,`stu_id`,`ques_th`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='答题表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `do_question`
--

LOCK TABLES `do_question` WRITE;
/*!40000 ALTER TABLE `do_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `do_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homework`
--

DROP TABLE IF EXISTS `homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `homework` (
  `homework_id` int(11) NOT NULL COMMENT 'Homework_id的组成是class_id % 10000 + homework_th*100',
  `class_id` decimal(10,0) NOT NULL COMMENT '教学班号',
  `homework_th` int(11) NOT NULL COMMENT '作业编号（第几次作业）',
  `sum_grade` decimal(3,0) NOT NULL COMMENT '总分',
  `ddl` datetime NOT NULL COMMENT '截止日期',
  PRIMARY KEY (`homework_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作业';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homework`
--

LOCK TABLES `homework` WRITE;
/*!40000 ALTER TABLE `homework` DISABLE KEYS */;
/*!40000 ALTER TABLE `homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_ex`
--

DROP TABLE IF EXISTS `learning_ex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learning_ex` (
  `t_id` decimal(11,0) NOT NULL COMMENT '老师id',
  `learning_ex_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '心得id',
  `title` varchar(45) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `release_time` datetime NOT NULL COMMENT '发布时间',
  PRIMARY KEY (`learning_ex_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='交流心得表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_ex`
--

LOCK TABLES `learning_ex` WRITE;
/*!40000 ALTER TABLE `learning_ex` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_ex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `class_id` decimal(10) NOT NULL COMMENT '教学班号',
  `lesson_num` int(11) NOT NULL COMMENT '第几次课',
  `ppt_addr` varchar(50) DEFAULT NULL COMMENT 'PPT的地址',
  `video_addr` varchar(50) DEFAULT NULL COMMENT '视频地址',
  PRIMARY KEY (`class_id`,`lesson_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程资料';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `homework_id` int(11) NOT NULL COMMENT '作业id\nHomework_id的组成是class_id % 10000 + homework_th*100',
  `type` int(11) NOT NULL COMMENT '题目类型\n1:单选题 2.多选题 3:填空题 4：问答题 5.判断题',
  `ques_th` int(11) NOT NULL COMMENT '题号',
  `question` text NOT NULL COMMENT '题目\n对于选择题，问题和选项都写在一起，用”&&&”隔开,此分隔符前后分别为问题和选项',
  `answer` text COMMENT '答案',
  `grade` decimal(3,0) DEFAULT NULL COMMENT '题目分值',
  PRIMARY KEY (`homework_id`,`ques_th`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='question表主要用于做作业，批改作业.\nquestion表中的主键是第几次作业+题号';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `stu_id` decimal(11,0) NOT NULL COMMENT '学号',
  `stu_name` varchar(10) NOT NULL COMMENT '姓名',
  `stu_pwd` varchar(32) NOT NULL COMMENT '密码',
  `pwd_question` varchar(45) DEFAULT NULL COMMENT '密保问题',
  `pwd_answer` varchar(45) DEFAULT NULL COMMENT '密保答案',
  PRIMARY KEY (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take`
--

DROP TABLE IF EXISTS `take`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `take` (
  `stu_id` decimal(11,0) NOT NULL COMMENT '学生id',
  `class_id` int(11) NOT NULL COMMENT '教学班id',
  PRIMARY KEY (`stu_id`,`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生上课';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take`
--

LOCK TABLES `take` WRITE;
/*!40000 ALTER TABLE `take` DISABLE KEYS */;
/*!40000 ALTER TABLE `take` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teach`
--

DROP TABLE IF EXISTS `teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teach` (
  `t_id` decimal(11,0) NOT NULL COMMENT '老师id',
  `class_id` int(11) NOT NULL COMMENT '教学班id',
  PRIMARY KEY (`t_id`,`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='老师上课';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teach`
--

LOCK TABLES `teach` WRITE;
/*!40000 ALTER TABLE `teach` DISABLE KEYS */;
/*!40000 ALTER TABLE `teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `t_id` decimal(11,0) NOT NULL COMMENT '工号',
  `t_name` varchar(10) NOT NULL COMMENT '姓名',
  `t_pwd` varchar(32) NOT NULL COMMENT '密码',
  `pwd_question` varchar(45) DEFAULT NULL COMMENT '密保问题',
  `pwd_answer` varchar(45) DEFAULT NULL COMMENT '密保答案',
  `tel` decimal(11,0) DEFAULT NULL COMMENT '电话',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `achievement` text COMMENT '科研成果',
  `style` text COMMENT '教学风格',
  `publication` text COMMENT '出版书籍',
  `reputation` text COMMENT '荣誉',
  `department` varchar(45) DEFAULT NULL COMMENT '部门',
  `job_title` varchar(45) DEFAULT NULL COMMENT '职位',
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='老师';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-14  2:09:16
