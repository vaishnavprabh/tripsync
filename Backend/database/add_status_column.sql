-- Add status column to existing users table
ALTER TABLE `users` 
ADD COLUMN `status` ENUM('active', 'blocked') NOT NULL DEFAULT 'active' AFTER `role`;

