-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: teras3
-- ------------------------------------------------------
-- Server version	5.7.35-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `assignNo` int(11) NOT NULL AUTO_INCREMENT,
  `classCode` varchar(20) DEFAULT NULL,
  `subjectCode` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `UUID` varchar(200) DEFAULT NULL,
  `teacherId` varchar(10) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignNo`),
  KEY `classCode` (`classCode`),
  KEY `subjectCode` (`subjectCode`),
  KEY `teacherId` (`teacherId`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`subjectCode`) REFERENCES `subject_detail` (`subjectCode`),
  CONSTRAINT `assignment_ibfk_3` FOREIGN KEY (`teacherId`) REFERENCES `member_teacher` (`teacherId`),
  CONSTRAINT `assignment_ibfk_4` FOREIGN KEY (`UUID`) REFERENCES `attachment` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment` (
  `UUID` varchar(200) NOT NULL,
  `uploadPath` varchar(200) DEFAULT NULL,
  `fileType` varchar(50) DEFAULT NULL,
  `fileName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `studentId` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `isAttendance` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`studentId`,`date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `member_student` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `calender_class`
--

DROP TABLE IF EXISTS `calender_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calender_class` (
  `classCode` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `event` text,
  PRIMARY KEY (`classCode`,`date`),
  CONSTRAINT `calender_class_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `classCode` varchar(20) NOT NULL,
  `schoolCode` varchar(50) DEFAULT NULL,
  `grade` int(1) DEFAULT NULL,
  `class` int(2) DEFAULT NULL,
  PRIMARY KEY (`classCode`),
  KEY `schoolCode` (`schoolCode`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`schoolCode`) REFERENCES `school` (`schoolCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment_assign`
--

DROP TABLE IF EXISTS `comment_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_assign` (
  `commentNo` int(11) NOT NULL AUTO_INCREMENT,
  `assignNo` int(11) DEFAULT NULL,
  `studentId` varchar(50) DEFAULT NULL,
  `content` text,
  `UUID` varchar(200) DEFAULT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`commentNo`),
  KEY `assignNo` (`assignNo`),
  KEY `studentId` (`studentId`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `comment_assign_ibfk_1` FOREIGN KEY (`assignNo`) REFERENCES `assignment` (`assignNo`),
  CONSTRAINT `comment_assign_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `member_student` (`studentId`),
  CONSTRAINT `comment_assign_ibfk_3` FOREIGN KEY (`UUID`) REFERENCES `attachment` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member_student`
--

DROP TABLE IF EXISTS `member_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_student` (
  `studentId` varchar(50) NOT NULL,
  `studentPw` varchar(50) DEFAULT NULL,
  `studentName` varchar(10) DEFAULT NULL,
  `studentEmail` varchar(50) DEFAULT NULL,
  `classCode` varchar(20) DEFAULT '0',
  `studentPhoneNumberFirst` int(11) DEFAULT NULL,
  `studentPhoneNumberMiddle` int(11) DEFAULT NULL,
  `studentPhoneNumberLast` int(11) DEFAULT NULL,
  `emergencyPhoneNumberFirst` int(11) DEFAULT NULL,
  `emergencyPhoneNumberMiddle` int(11) DEFAULT NULL,
  `emergencyPhoneNumberLast` int(11) DEFAULT NULL,
  PRIMARY KEY (`studentId`),
  KEY `classCode` (`classCode`),
  CONSTRAINT `member_student_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member_teacher`
--

DROP TABLE IF EXISTS `member_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_teacher` (
  `teacherId` varchar(50) NOT NULL,
  `teacherPw` varchar(50) DEFAULT NULL,
  `teacherName` varchar(10) DEFAULT NULL,
  `teacherEmail` varchar(50) DEFAULT NULL,
  `classCode` varchar(20) DEFAULT NULL,
  `teacherPhoneNumberFirst` int(11) DEFAULT NULL,
  `teacherPhoneNumberMiddle` int(11) DEFAULT NULL,
  `teacherPhoneNumberLast` int(11) DEFAULT NULL,
  `subjectCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`teacherId`),
  KEY `subjectCode` (`subjectCode`),
  CONSTRAINT `member_teacher_ibfk_1` FOREIGN KEY (`subjectCode`) REFERENCES `subject_detail` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice_school`
--

DROP TABLE IF EXISTS `notice_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_school` (
  `noticeNo` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `classCode` varchar(20) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `teacherId` varchar(50) DEFAULT NULL,
  `UUID` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`noticeNo`),
  KEY `classCode` (`classCode`),
  KEY `teacherId` (`teacherId`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `notice_school_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `notice_school_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `member_teacher` (`teacherId`),
  CONSTRAINT `notice_school_ibfk_3` FOREIGN KEY (`UUID`) REFERENCES `attachment` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice_subject`
--

DROP TABLE IF EXISTS `notice_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_subject` (
  `noticeNo` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `classCode` varchar(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `teacherId` varchar(50) DEFAULT NULL,
  `UUID` varchar(200) DEFAULT NULL,
  `subjectCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`noticeNo`),
  KEY `classCode` (`classCode`),
  KEY `teacherId` (`teacherId`),
  KEY `UUID` (`UUID`),
  KEY `subjectCode` (`subjectCode`),
  CONSTRAINT `notice_subject_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `notice_subject_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `member_teacher` (`teacherId`),
  CONSTRAINT `notice_subject_ibfk_3` FOREIGN KEY (`UUID`) REFERENCES `attachment` (`UUID`),
  CONSTRAINT `notice_subject_ibfk_4` FOREIGN KEY (`subjectCode`) REFERENCES `subject_detail` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `schoolCode` varchar(50) NOT NULL,
  `schoolName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`schoolCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `studentId` varchar(50) NOT NULL,
  `subjectCode` int(11) NOT NULL,
  `date` date NOT NULL,
  `score` int(3) DEFAULT NULL,
  PRIMARY KEY (`studentId`,`subjectCode`,`date`),
  KEY `subjectCode` (`subjectCode`),
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `member_student` (`studentId`),
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`subjectCode`) REFERENCES `subject_detail` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_detail`
--

DROP TABLE IF EXISTS `subject_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_detail` (
  `subjectCode` int(11) NOT NULL,
  `subjectName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_teacher`
--

DROP TABLE IF EXISTS `subject_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_teacher` (
  `teacherId` varchar(50) NOT NULL,
  `classCode` varchar(20) NOT NULL,
  PRIMARY KEY (`teacherId`,`classCode`),
  KEY `classCode` (`classCode`),
  CONSTRAINT `subject_teacher_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `member_teacher` (`teacherId`),
  CONSTRAINT `subject_teacher_ibfk_2` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable` (
  `classCode` varchar(20) NOT NULL,
  `day` varchar(3) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `subjectCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`classCode`,`day`,`startTime`,`endTime`),
  KEY `subjectCode` (`subjectCode`),
  CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`subjectCode`) REFERENCES `subject_detail` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-21 16:14:21
