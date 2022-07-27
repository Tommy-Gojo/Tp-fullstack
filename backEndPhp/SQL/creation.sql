-- INIT
CREATE DATABASE `fighting_surface`  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;

USE `fighting_surface`;

CREATE TABLE
    `monster`(
        id_monster INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name_monster VARCHAR(30) NOT NULL UNIQUE,
        life_monster INT NOT NULL,
        att_monster INT NOT NULL,
        def_monster INT NOT NULL,
        score_monster INT NOT NULL,
        img_monster VARCHAR(180) NOT NULL UNIQUE
    ) ENGINE = InnoDB;

CREATE TABLE
    `boss`(
        id_boss INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name_boss VARCHAR(30) NOT NULL UNIQUE,
        life_boss INT NOT NULL,
        att_boss INT NOT NULL,
        def_boss INT NOT NULL,
        score_boss INT NOT NULL,
        img_boss VARCHAR(180) NOT NULL UNIQUE
    ) ENGINE = InnoDB;
  
-- L'idée c'est de la mettre quand même 
-- Il y aura un insert de base, avec le héro par défaut

CREATE TABLE 
    `class`(
        id_class INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name_class VARCHAR(30) NOT NULL UNIQUE,
        life_class INT NOT NULL,
        att_class INT NOT NULL,
        def_class INT NOT NULL,
        img_class VARCHAR(180) NOT NULL UNIQUE
    ) ENGINE = InnoDB ;


-- J'ai ajouter le nom du joueur
-- une liaison avec la table class pour afficher le hero
-- une date pour afficher la date de l'entrée

CREATE TABLE
    `high_score`(
        id_high_score INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        player_name_high_score VARCHAR(50) NOT NULL,
        score_high_score INT NOT NULL,
        date_high_score DATETIME, 
        id_class INT NOT NULL,
        FOREIGN KEY (id_class) REFERENCES class(id_class)
    ) ENGINE = InnoDB;


-- MEME CHOSES QUE LA LIGNE 50 -- IGNORE
-- Peut être préferable car ne prend pas en compte l'ordre de creation
-- Si j'avais par exemple créée la table class après la table high score
-- j'aurais eu une erreur


-- ALTER TABLE
--     `high_score`
-- ADD
--     CONSTRAINT FOREIGN KEY (id_class) REFERENCES `class` (player_id);



