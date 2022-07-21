-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: teras2
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
-- Table structure for table `assign_attach`
--

DROP TABLE IF EXISTS `assign_attach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assign_attach` (
  `UUID` varchar(200) NOT NULL,
  `uploadPath` varchar(200) DEFAULT NULL,
  `fileType` varchar(50) DEFAULT NULL,
  `fileName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assign_comment`
--

DROP TABLE IF EXISTS `assign_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assign_comment` (
  `commentNo` int(11) NOT NULL AUTO_INCREMENT,
  `assignNo` int(11) DEFAULT NULL,
  `memberId` varchar(50) DEFAULT NULL,
  `content` text,
  `UUID` varchar(200) DEFAULT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`commentNo`),
  KEY `assignNo` (`assignNo`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `assign_comment_ibfk_1` FOREIGN KEY (`assignNo`) REFERENCES `assignment` (`assignNo`),
  CONSTRAINT `assign_comment_ibfk_2` FOREIGN KEY (`UUID`) REFERENCES `assign_attach` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `assignNo` int(11) NOT NULL AUTO_INCREMENT,
  `grade` int(1) DEFAULT NULL,
  `classCode` varchar(20) DEFAULT NULL,
  `subjectCode` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `UUID` varchar(200) DEFAULT NULL,
  `memberId` varchar(10) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignNo`),
  KEY `classCode` (`classCode`),
  KEY `subjectCode` (`subjectCode`),
  KEY `memberId` (`memberId`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`subjectCode`) REFERENCES `subject` (`subjectCode`),
  CONSTRAINT `assignment_ibfk_3` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  CONSTRAINT `assignment_ibfk_4` FOREIGN KEY (`UUID`) REFERENCES `assign_attach` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `memberId` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `isAttendance` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`memberId`,`date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `calender`
--

DROP TABLE IF EXISTS `calender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calender` (
  `classCode` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `event` text,
  PRIMARY KEY (`classCode`,`date`),
  CONSTRAINT `calender_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
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
  `school` varchar(10) DEFAULT NULL,
  `grade` int(1) DEFAULT NULL,
  `class` int(2) DEFAULT NULL,
  PRIMARY KEY (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberId` varchar(50) NOT NULL,
  `memberPw` varchar(50) DEFAULT NULL,
  `isStudent` tinyint(1) DEFAULT NULL,
  `memberName` varchar(10) DEFAULT NULL,
  `memberEmail` text,
  `classCode` varchar(20) DEFAULT '0',
  `phoneNumberFirst` int(11) DEFAULT NULL,
  `phoneNumberMiddle` int(11) DEFAULT NULL,
  `phoneNumberLast` int(11) DEFAULT NULL,
  `emergencyPhoneNumberFirst` int(11) DEFAULT NULL,
  `emergencyPhoneNumberMiddle` int(11) DEFAULT NULL,
  `emergencyPhoneNumberLast` int(11) DEFAULT NULL,
  PRIMARY KEY (`memberId`),
  KEY `classCode` (`classCode`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `noticeNo` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `classCode` varchar(20) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `memberId` varchar(50) DEFAULT NULL,
  `attachments` text,
  PRIMARY KEY (`noticeNo`),
  KEY `classCode` (`classCode`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `notice_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `score_lookup`
--

DROP TABLE IF EXISTS `score_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_lookup` (
  `memberId` varchar(50) NOT NULL,
  `subjectCode` int(11) NOT NULL,
  `date` date NOT NULL,
  `score` int(3) DEFAULT NULL,
  PRIMARY KEY (`memberId`,`subjectCode`,`date`),
  KEY `subjectCode` (`subjectCode`),
  CONSTRAINT `score_lookup_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  CONSTRAINT `score_lookup_ibfk_2` FOREIGN KEY (`subjectCode`) REFERENCES `subject` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subjectCode` int(11) NOT NULL,
  `subjectName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_notice`
--

DROP TABLE IF EXISTS `subject_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_notice` (
  `noticeNo` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `classCode` varchar(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `memberId` varchar(50) DEFAULT NULL,
  `attachments` text,
  `subjecName` text,
  PRIMARY KEY (`noticeNo`),
  KEY `classCode` (`classCode`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `subject_notice_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`),
  CONSTRAINT `subject_notice_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`)
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
  `subject` text,
  PRIMARY KEY (`classCode`,`day`,`startTime`,`endTime`),
  CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`classCode`) REFERENCES `class` (`classCode`)
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

-- Dump completed on 2022-07-21 11:25:19
