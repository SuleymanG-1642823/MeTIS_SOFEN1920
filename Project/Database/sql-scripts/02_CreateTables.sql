DROP DATABASE IF EXISTS groupfinder;
CREATE DATABASE groupfinder;
USE groupfinder;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255),
    last_name  varchar(255),
    mail nvarchar(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE category (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;
