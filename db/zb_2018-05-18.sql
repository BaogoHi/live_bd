# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 119.28.84.27 (MySQL 5.7.21)
# Database: zb
# Generation Time: 2018-05-18 03:15:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table live
# ------------------------------------------------------------

DROP TABLE IF EXISTS `live`;

CREATE TABLE `live` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomname` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `gift` int(11) DEFAULT NULL,
  `peonum` int(11) DEFAULT NULL,
  `livecode` varchar(255) NOT NULL,
  `liveurl` varchar(255) DEFAULT NULL,
  `usecustom` int(11) NOT NULL,
  `active` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roomname` (`roomname`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `live_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `live` WRITE;
/*!40000 ALTER TABLE `live` DISABLE KEYS */;

INSERT INTO `live` (`id`, `roomname`, `userId`, `gift`, `peonum`, `livecode`, `liveurl`, `usecustom`, `active`, `createdAt`, `updatedAt`)
VALUES
	(1,'klren',1,0,0,'klren','/klren',0,1,'2018-05-08 10:50:53','2018-05-08 10:50:53'),
	(2,'klren123',2,0,0,'klren123','/klren123',0,1,'2018-05-08 15:07:56','2018-05-08 15:07:56'),
	(3,'kelannan',4,0,0,'kelannan','/kelannan',0,1,'2018-05-08 15:33:36','2018-05-08 15:33:36'),
	(4,'zzes',5,0,0,'zzes','/zzes',0,1,'2018-05-08 15:35:40','2018-05-08 15:35:40'),
	(5,'fcfc',6,0,0,'fcfc','/fcfc',0,1,'2018-05-08 15:40:43','2018-05-08 15:40:43'),
	(6,'klren0312',7,0,0,'github_klren0312','/github_klren0312',0,1,'2018-05-16 08:28:25','2018-05-16 08:28:25');

/*!40000 ALTER TABLE `live` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table liveTag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `liveTag`;

CREATE TABLE `liveTag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` int(11) NOT NULL,
  `liveId` int(11) NOT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tagId` (`tagId`),
  KEY `liveId` (`liveId`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `liveTag_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `liveTag_ibfk_2` FOREIGN KEY (`liveId`) REFERENCES `live` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `liveTag_ibfk_3` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `liveTag` WRITE;
/*!40000 ALTER TABLE `liveTag` DISABLE KEYS */;

INSERT INTO `liveTag` (`id`, `tagId`, `liveId`, `tag_id`)
VALUES
	(1,1,1,NULL);

/*!40000 ALTER TABLE `liveTag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
	(1,'admin','2018-05-08 10:50:57','2018-05-08 10:50:57'),
	(2,'normal','2018-05-08 15:13:57','2018-05-08 15:13:57');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SequelizeMeta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SequelizeMeta`;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;

INSERT INTO `SequelizeMeta` (`name`)
VALUES
	('20180504015321-user.js'),
	('20180504021405-live.js'),
	('20180504022313-tag.js'),
	('20180507070123-live_tag.js'),
	('20180508011212-role.js'),
	('20180508015319-user_role.js');

/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;

INSERT INTO `tag` (`id`, `name`)
VALUES
	(1,'klklkl');

/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `livecode` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`, `email`, `livecode`, `provider`, `avatar`, `createdAt`, `updatedAt`)
VALUES
	(1,'klren','$2a$10$JRyD0VKz3fvfZFA.dKOY8evKhvZbY8aFAUxoi6rwzHJh8MOEFNB0e','klren@qq.com','klren','local',NULL,'2018-05-08 10:50:53','2018-05-08 10:50:53'),
	(2,'klren123','$2a$10$f.mrmOA4aJd4GpQYUfSaTe0ZWLza5KH/oA5bG/uxo0ueIRruQfFl2','klren123@qq.com','klren123','local',NULL,'2018-05-08 15:07:55','2018-05-08 15:07:55'),
	(4,'kelannan','$2a$10$JRWsiDPsV8uTP5XVvKexuO1PUmvS3LCJOw4BjDylR0BFc4hrP0I6m','kelannan@qq.com','kelannan','local',NULL,'2018-05-08 15:33:36','2018-05-08 15:33:36'),
	(5,'zzes','$2a$10$/H1dDLYjOC.6Eudy71fHm.p/esGV8u1fWtQ1G6KUiQpCb5K8vCoLm','zzes@qq.com','zzes','local',NULL,'2018-05-08 15:35:40','2018-05-08 15:35:40'),
	(6,'fcfc','zzes123','605747907@qq.com','fcfc','local',NULL,'2018-05-08 15:40:43','2018-05-11 17:11:16'),
	(7,'klren0312','dcd3989058526eede5f83002f538592436c390ef','null@email.com','github_klren0312','github','https://avatars3.githubusercontent.com/u/10903843?v=4','2018-05-16 08:28:24','2018-05-16 08:28:24');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userRole
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userRole`;

CREATE TABLE `userRole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userRole_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userRole_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `userRole` WRITE;
/*!40000 ALTER TABLE `userRole` DISABLE KEYS */;

INSERT INTO `userRole` (`id`, `userId`, `roleId`, `created_at`, `updated_at`)
VALUES
	(1,1,1,'2018-05-08 10:50:58','2018-05-08 10:50:58'),
	(2,2,2,'2018-05-08 10:50:58','2018-05-08 10:50:58'),
	(3,4,2,'2018-05-08 15:33:36','2018-05-08 15:33:36'),
	(4,5,2,'2018-05-08 15:35:40','2018-05-08 15:35:40'),
	(5,6,2,'2018-05-08 15:40:43','2018-05-08 15:40:43');

/*!40000 ALTER TABLE `userRole` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
