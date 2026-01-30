-- Migration Script: Add status column to users table
-- Run this script if your users table doesn't have a status column yet

USE tripsync;

-- Add status column if it doesn't exist
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `status` ENUM('active', 'blocked') NOT NULL DEFAULT 'active' AFTER `role`;

-- Add index on status for better query performance
ALTER TABLE `users` 
ADD INDEX IF NOT EXISTS `idx_status` (`status`);

-- Update all existing users to have 'active' status (if they don't have one)
UPDATE `users` SET `status` = 'active' WHERE `status` IS NULL OR `status` = '';

