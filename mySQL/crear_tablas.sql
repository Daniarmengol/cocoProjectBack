SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema coco_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema coco_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coco_db` DEFAULT CHARACTER SET utf8mb3 ;
USE `coco_db` ;

-- -----------------------------------------------------
-- Table `coco_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coco_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `nombre` VARCHAR(25) NOT NULL,
  `apellidos` VARCHAR(60) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `avatar` VARCHAR(200) NOT NULL DEFAULT 'https://i.imgur.com/b90NgSA.png',
  `trusted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `coco_db`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coco_db`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` DECIMAL(5,2) NULL DEFAULT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(200) NOT NULL DEFAULT 'https://i.imgur.com/b90NgSA.png',
  `marca` VARCHAR(45) NULL DEFAULT NULL,
  `estado` ENUM('nuevo', 'usado', 'desperfectos') NOT NULL,
  `fecha_subida` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_productos_usuarios_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `coco_db`.`usuarios` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `coco_db`.`coleccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coco_db`.`coleccion` (
  `usuario_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `precio` DECIMAL(5,2) NULL DEFAULT NULL,
  `en_venta` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`usuario_id`, `producto_id`),
  INDEX `fk_usuarios_has_productos_productos1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_usuarios_has_productos_usuarios1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_productos_productos1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `coco_db`.`productos` (`id`),
  CONSTRAINT `fk_usuarios_has_productos_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `coco_db`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
