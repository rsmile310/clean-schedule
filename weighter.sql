/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.19-MariaDB : Database - weighter
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`weighter` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `weighter`;

/*Table structure for table `data_tbl` */

DROP TABLE IF EXISTS `data_tbl`;

CREATE TABLE `data_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AREA` varchar(50) DEFAULT NULL,
  `EQUIPMENT_CODE` varchar(50) DEFAULT NULL,
  `ACTIVITY` varchar(50) DEFAULT NULL,
  `ACTIVITY2` varchar(50) DEFAULT NULL,
  `ITEM_DESCRIPTION` varchar(50) DEFAULT NULL,
  `FREQUENCY` varchar(50) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

/*Data for the table `data_tbl` */

insert  into `data_tbl`(`id`,`AREA`,`EQUIPMENT_CODE`,`ACTIVITY`,`ACTIVITY2`,`ITEM_DESCRIPTION`,`FREQUENCY`,`START_DATE`) values 
(1,'Area 01\r\n','Item Code 001\r\n','Visual Inspection\r\n','Inspection\r\n','Area 01 - Item Code 001\r\n','Everyday','2022-02-01'),
(2,'Area 02\r\n','Item Code 018\r\n','Visual Inspection\r\n','Inspection\r\n','Area 02 - Item Code 016','Weekly','2022-02-02'),
(3,'Area 03\r\n','Item Code 026\r\n','Visual Inspection\r\n','Inspection\r\n','Area 03 - Item Code 026','Monthly','2022-01-11'),
(4,'Area 04\r\n','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Everyday','2022-04-04'),
(6,'Area 05','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Weekly','2022-04-04'),
(7,'Area 06','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Monthly','2022-04-05'),
(8,'Area 07','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Everyday','2022-04-06'),
(9,'Area 08','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Weekly','2022-04-07'),
(10,'Area 09','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Everyday','2022-04-08'),
(11,'Area 10','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Weekly','2022-04-09'),
(12,'Area 11','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Everyday','2022-04-10'),
(13,'Area 12','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Monthly','2022-04-11'),
(14,'Area 13','Item Code 036\r\n','Visual Inspection\r\n','Inspection\r\n','Area 04 - Item Code 036\r\n','Everyday','2022-04-12');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
