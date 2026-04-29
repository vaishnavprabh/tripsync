-- TripSync Organizer Module Database Schema
-- This file contains all tables needed for organizer functionality

USE tripsync;

-- ============================================
-- TRIPS TABLE
-- ============================================
DROP TABLE IF EXISTS `trips`;
CREATE TABLE IF NOT EXISTS `trips` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `organizer_id` INT NOT NULL,
    `trip_name` VARCHAR(255) NOT NULL,
    `destination` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `max_participants` INT DEFAULT 20,
    `estimated_budget` DECIMAL(10, 2) DEFAULT 0.00,
    `status` ENUM('draft', 'published', 'active', 'completed', 'cancelled') NOT NULL DEFAULT 'draft',
    `invite_code` VARCHAR(50) UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`organizer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_organizer` (`organizer_id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_dates` (`start_date`, `end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- TRIP INVITATIONS TABLE
-- ============================================
DROP TABLE IF EXISTS `trip_invitations`;
CREATE TABLE IF NOT EXISTS `trip_invitations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `invited_user_id` INT,
    `invited_email` VARCHAR(255) NOT NULL,
    `invited_name` VARCHAR(255),
    `status` ENUM('pending', 'accepted', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
    `invited_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `responded_at` TIMESTAMP NULL,
    `custom_message` TEXT,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`invited_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_trip` (`trip_id`),
    INDEX `idx_email` (`invited_email`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- TRIP PARTICIPANTS TABLE
-- ============================================
DROP TABLE IF EXISTS `trip_participants`;
CREATE TABLE IF NOT EXISTS `trip_participants` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `role` ENUM('participant', 'co-organizer') NOT NULL DEFAULT 'participant',
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_participant` (`trip_id`, `user_id`),
    INDEX `idx_trip` (`trip_id`),
    INDEX `idx_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- EXPENSES TABLE
-- ============================================
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `paid_by_user_id` INT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `expense_date` DATE NOT NULL,
    `split_method` ENUM('equal', 'custom', 'individual') NOT NULL DEFAULT 'equal',
    `category` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`paid_by_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_trip` (`trip_id`),
    INDEX `idx_paid_by` (`paid_by_user_id`),
    INDEX `idx_date` (`expense_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- EXPENSE SPLITS TABLE (for custom splits)
-- ============================================
DROP TABLE IF EXISTS `expense_splits`;
CREATE TABLE IF NOT EXISTS `expense_splits` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `expense_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `percentage` DECIMAL(5, 2),
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_expense` (`expense_id`),
    INDEX `idx_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- ITINERARY DAYS TABLE
-- ============================================
DROP TABLE IF EXISTS `itinerary_days`;
CREATE TABLE IF NOT EXISTS `itinerary_days` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `day_number` INT NOT NULL,
    `date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_day` (`trip_id`, `day_number`),
    INDEX `idx_trip` (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- ITINERARY ACTIVITIES TABLE
-- ============================================
DROP TABLE IF EXISTS `itinerary_activities`;
CREATE TABLE IF NOT EXISTS `itinerary_activities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `day_id` INT NOT NULL,
    `activity_time` TIME NOT NULL,
    `activity_name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255),
    `description` TEXT,
    `activity_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`day_id`) REFERENCES `itinerary_days`(`id`) ON DELETE CASCADE,
    INDEX `idx_day` (`day_id`),
    INDEX `idx_order` (`activity_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `created_by_user_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_trip` (`trip_id`),
    INDEX `idx_created_by` (`created_by_user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- MESSAGES TABLE (Group Chat)
-- ============================================
DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `message_text` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_trip` (`trip_id`),
    INDEX `idx_user` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-generate invite code when trip is created
DELIMITER //
CREATE TRIGGER `generate_invite_code` 
BEFORE INSERT ON `trips`
FOR EACH ROW
BEGIN
    IF NEW.invite_code IS NULL THEN
        SET NEW.invite_code = CONCAT('TRIP-', UPPER(SUBSTRING(MD5(CONCAT(NEW.organizer_id, NOW(), RAND())), 1, 8)));
    END IF;
END//
DELIMITER ;

-- Auto-add organizer as participant when trip is published
DELIMITER //
CREATE TRIGGER `add_organizer_as_participant`
AFTER INSERT ON `trips`
FOR EACH ROW
BEGIN
    INSERT INTO `trip_participants` (`trip_id`, `user_id`, `role`)
    VALUES (NEW.id, NEW.organizer_id, 'participant')
    ON DUPLICATE KEY UPDATE `role` = 'participant';
END//
DELIMITER ;
