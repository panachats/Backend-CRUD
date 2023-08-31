CREATE DATABASE  IF NOT EXISTS `final_itd62_276` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final_itd62_276`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: final_itd62_276
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EmpID` int NOT NULL AUTO_INCREMENT,
  `EmpName` varchar(30) NOT NULL,
  `EmpLastname` varchar(45) NOT NULL,
  `EmpAge` int NOT NULL,
  `EmpAddress` text NOT NULL,
  `EmpSalary` int NOT NULL,
  `EmpPosition` varchar(30) NOT NULL,
  `Activeflag` int DEFAULT '1',
  PRIMARY KEY (`EmpID`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (52,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(53,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(54,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(55,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(56,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(57,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(58,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(59,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(60,'chat','aiam',20,'138/2 อ. เมือง ต. ท่าซัก จ. นครศรีธรรมราช',3000,'student',1),(65,'ะำห','ๆไำๆ',12,'qw',12,'qw',1),(66,'test','test',12,'test',12,'test',1),(67,'test','test',12,'test',12,'test',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Authority` int DEFAULT NULL,
  `Activeflag` int DEFAULT '1',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,'admin','admin@min',1,1),(2,'user','2911451183ca',2,1);
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-03 23:15:27
