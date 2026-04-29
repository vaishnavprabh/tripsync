-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: tripsync
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin@tripsync.com','admin123','TripSync Admin','2025-12-07 06:42:31','2025-12-07 06:42:31');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `created_by_user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_trip` (`trip_id`),
  KEY `idx_created_by` (`created_by_user_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_splits`
--

DROP TABLE IF EXISTS `expense_splits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_splits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expense_id` int NOT NULL,
  `user_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_expense` (`expense_id`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `expense_splits_ibfk_1` FOREIGN KEY (`expense_id`) REFERENCES `expenses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `expense_splits_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_splits`
--

LOCK TABLES `expense_splits` WRITE;
/*!40000 ALTER TABLE `expense_splits` DISABLE KEYS */;
/*!40000 ALTER TABLE `expense_splits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `paid_by_user_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `split_method` enum('equal','custom','individual') NOT NULL DEFAULT 'equal',
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_trip` (`trip_id`),
  KEY `idx_paid_by` (`paid_by_user_id`),
  KEY `idx_date` (`expense_date`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`paid_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,3,2,'Food',1000.00,'2026-02-17','equal','Food','2026-02-14 09:50:12','2026-02-14 09:50:12');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `type` enum('feedback','complaint','technical') NOT NULL DEFAULT 'feedback',
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('pending','in_progress','resolved','closed') NOT NULL DEFAULT 'pending',
  `admin_reply` text,
  `replied_by_admin_id` int DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `replied_by_admin_id` (`replied_by_admin_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_type` (`type`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`replied_by_admin_id`) REFERENCES `admin` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary_activities`
--

DROP TABLE IF EXISTS `itinerary_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `activity_time` time NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `activity_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_day` (`day_id`),
  KEY `idx_order` (`activity_order`),
  CONSTRAINT `itinerary_activities_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `itinerary_days` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary_activities`
--

LOCK TABLES `itinerary_activities` WRITE;
/*!40000 ALTER TABLE `itinerary_activities` DISABLE KEYS */;
INSERT INTO `itinerary_activities` VALUES (1,1,'09:00:00','Act1','TEST','HBShdbshdbs',0,'2026-02-14 08:58:04','2026-02-14 08:58:04'),(2,1,'12:00:00','Act2','Test','dksmkmckmv',1,'2026-02-14 08:58:04','2026-02-14 08:58:04');
/*!40000 ALTER TABLE `itinerary_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary_days`
--

DROP TABLE IF EXISTS `itinerary_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary_days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `day_number` int NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_day` (`trip_id`,`day_number`),
  KEY `idx_trip` (`trip_id`),
  CONSTRAINT `itinerary_days_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary_days`
--

LOCK TABLES `itinerary_days` WRITE;
/*!40000 ALTER TABLE `itinerary_days` DISABLE KEYS */;
INSERT INTO `itinerary_days` VALUES (1,2,1,'2026-02-16','2026-02-14 08:58:04'),(2,2,2,'2026-02-17','2026-02-14 08:58:04'),(3,2,3,'2026-02-18','2026-02-14 08:58:04');
/*!40000 ALTER TABLE `itinerary_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_trip` (`trip_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,4,'Hyy','2026-02-14 10:15:09');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_invitations`
--

DROP TABLE IF EXISTS `trip_invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_invitations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `invited_user_id` int DEFAULT NULL,
  `invited_email` varchar(255) NOT NULL,
  `invited_name` varchar(255) DEFAULT NULL,
  `status` enum('pending','accepted','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `invited_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `responded_at` timestamp NULL DEFAULT NULL,
  `custom_message` text,
  PRIMARY KEY (`id`),
  KEY `invited_user_id` (`invited_user_id`),
  KEY `idx_trip` (`trip_id`),
  KEY `idx_email` (`invited_email`),
  KEY `idx_status` (`status`),
  CONSTRAINT `trip_invitations_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trip_invitations_ibfk_2` FOREIGN KEY (`invited_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_invitations`
--

LOCK TABLES `trip_invitations` WRITE;
/*!40000 ALTER TABLE `trip_invitations` DISABLE KEYS */;
/*!40000 ALTER TABLE `trip_invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_participants`
--

DROP TABLE IF EXISTS `trip_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `user_id` int NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('participant','co-organizer') NOT NULL DEFAULT 'participant',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_participant` (`trip_id`,`user_id`),
  KEY `idx_trip` (`trip_id`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `trip_participants_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trip_participants_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_participants`
--

LOCK TABLES `trip_participants` WRITE;
/*!40000 ALTER TABLE `trip_participants` DISABLE KEYS */;
INSERT INTO `trip_participants` VALUES (2,2,2,'2026-02-14 08:53:22','co-organizer'),(3,3,2,'2026-02-14 09:14:56','co-organizer'),(4,4,2,'2026-02-14 09:14:56','co-organizer'),(5,5,2,'2026-02-14 09:14:56','co-organizer'),(6,6,2,'2026-02-14 09:14:56','co-organizer'),(7,7,2,'2026-02-14 09:14:56','co-organizer'),(8,8,2,'2026-02-14 09:14:56','co-organizer'),(9,9,2,'2026-02-14 09:14:56','co-organizer'),(10,10,2,'2026-02-14 09:14:56','co-organizer'),(11,3,3,'2026-02-14 09:27:48','participant'),(12,3,4,'2026-02-14 10:12:36','participant');
/*!40000 ALTER TABLE `trip_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organizer_id` int NOT NULL,
  `trip_name` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `max_participants` int DEFAULT '20',
  `estimated_budget` decimal(10,2) DEFAULT '0.00',
  `status` enum('draft','published','active','completed','cancelled') NOT NULL DEFAULT 'draft',
  `invite_code` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invite_code` (`invite_code`),
  KEY `idx_organizer` (`organizer_id`),
  KEY `idx_status` (`status`),
  KEY `idx_dates` (`start_date`,`end_date`),
  CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (2,2,'College Package','Goa','yesthshshb','2026-02-17','2026-02-19',20,7000.00,'published','TRIP-65939F6B','2026-02-14 08:53:22','2026-02-14 08:58:04'),(3,2,'Goa Beach Adventure','Goa, India','Experience the beautiful beaches of Goa with water sports, nightlife, and delicious seafood. Perfect for a fun-filled vacation!','2025-03-15','2025-03-20',15,25000.00,'published','TRIP-GOA2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(4,2,'Manali Mountain Escape','Manali, Himachal Pradesh','Explore the scenic beauty of Manali with snow-capped mountains, adventure activities, and peaceful nature walks.','2025-04-10','2025-04-15',12,30000.00,'published','TRIP-MANALI2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(5,2,'Kerala Backwaters Tour','Kerala, India','Cruise through the serene backwaters of Kerala, enjoy traditional houseboats, and experience the rich culture of God\'s Own Country.','2025-05-01','2025-05-06',10,35000.00,'published','TRIP-KERALA2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(6,2,'Rajasthan Heritage Journey','Jaipur, Udaipur, Jodhpur','Discover the royal heritage of Rajasthan with magnificent palaces, forts, and vibrant culture across the golden triangle.','2025-06-15','2025-06-22',20,45000.00,'published','TRIP-RAJ2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(7,2,'Darjeeling Tea Trail','Darjeeling, West Bengal','Visit the famous tea gardens of Darjeeling, enjoy mountain views, and experience the toy train journey.','2025-07-10','2025-07-14',8,28000.00,'published','TRIP-DARJ2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(8,2,'Rishikesh Adventure Camp','Rishikesh, Uttarakhand','Thrilling adventure activities including river rafting, bungee jumping, and yoga sessions by the Ganges.','2025-08-05','2025-08-09',12,22000.00,'published','TRIP-RISHI2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(9,2,'Andaman Island Paradise','Port Blair, Havelock, Neil Island','Explore pristine beaches, coral reefs, and enjoy water activities in the beautiful Andaman Islands.','2025-09-01','2025-09-08',15,55000.00,'published','TRIP-ANDAMAN2025','2026-02-14 09:14:56','2026-02-14 09:14:56'),(10,2,'Shimla Winter Wonderland','Shimla, Himachal Pradesh','Experience the winter charm of Shimla with snow activities, scenic views, and colonial architecture.','2025-12-20','2025-12-25',18,32000.00,'published','TRIP-SHIMLA2025','2026-02-14 09:14:56','2026-02-14 09:14:56');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('traveler','organizer') NOT NULL DEFAULT 'traveler',
  `status` enum('active','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Vaishnav','vaishnav@gmail.com','8457961523','asdasd','organizer','active','2025-12-19 06:07:59','2025-12-19 06:20:20'),(2,'Test Organizer','test@gmail.com','7845784578','asdasd','organizer','active','2025-12-19 06:21:04','2025-12-19 06:21:36'),(3,'traveler','traveler1@gmail.com','8585969656','asdasd','traveler','active','2025-12-19 06:32:07','2025-12-19 06:32:07'),(4,'Naseef','naseefnaseefvkd@gmail.com','8745256214','Asdasd123','traveler','active','2026-02-14 08:30:01','2026-02-14 08:30:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-14 16:23:41
