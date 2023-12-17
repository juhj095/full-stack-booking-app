-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BookingDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BookingDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BookingDB` DEFAULT CHARACTER SET utf8 ;
USE `BookingDB` ;

-- -----------------------------------------------------
-- Table `BookingDB`.`FacilityType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BookingDB`.`FacilityType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BookingDB`.`Facility`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BookingDB`.`Facility` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `FacilityType_id` INT NOT NULL,
  PRIMARY KEY (`id`, `FacilityType_id`),
  INDEX `fk_Facility_FacilityType1_idx` (`FacilityType_id` ASC) VISIBLE,
  CONSTRAINT `fk_Facility_FacilityType1`
    FOREIGN KEY (`FacilityType_id`)
    REFERENCES `BookingDB`.`FacilityType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BookingDB`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BookingDB`.`Customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BookingDB`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BookingDB`.`Booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time` DATETIME NOT NULL,
  `Facility_id` INT NOT NULL,
  `Customer_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Facility_id`, `Customer_id`),
  INDEX `fk_Booking_Facility_idx` (`Facility_id` ASC) VISIBLE,
  INDEX `fk_Booking_Customer1_idx` (`Customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Booking_Facility`
    FOREIGN KEY (`Facility_id`)
    REFERENCES `BookingDB`.`Facility` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Booking_Customer1`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `BookingDB`.`Customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `BookingDB`.`FacilityType`
-- -----------------------------------------------------
START TRANSACTION;
USE `BookingDB`;
INSERT INTO `BookingDB`.`FacilityType` (`id`, `type`) VALUES (1, 'Jalkapallo');
INSERT INTO `BookingDB`.`FacilityType` (`id`, `type`) VALUES (2, 'Jääkiekko');
INSERT INTO `BookingDB`.`FacilityType` (`id`, `type`) VALUES (3, 'Tennis');

COMMIT;


-- -----------------------------------------------------
-- Data for table `BookingDB`.`Facility`
-- -----------------------------------------------------
START TRANSACTION;
USE `BookingDB`;
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (1, 'Keskuskentän kaukalo', 'Kaartokatu 6', 2);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (2, 'Kuopionlahden kaukalo', 'Maria Jotunin puisto', 2);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (3, 'Koulupuiston kaukalo', 'Opistotie', 2);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (4, 'Rauhalahden kenttä', 'Katiskaniementie 1', 1);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (5, 'Niiralan kenttä', 'Valkeisenkatu', 1);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (6, 'Väinölänniemen kenttä', 'Väinölänniemi 26', 3);
INSERT INTO `BookingDB`.`Facility` (`id`, `name`, `address`, `FacilityType_id`) VALUES (7, 'Lippumäen kenttä', 'Rauhalahdentie 66', 3);

COMMIT;

