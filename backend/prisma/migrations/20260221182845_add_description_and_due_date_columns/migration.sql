-- AlterTable
ALTER TABLE `Task` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `due_date` DATETIME(3) NULL;
