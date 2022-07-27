-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 24 juin 2022 à 13:12
-- Version du serveur : 5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `game`
--

-- --------------------------------------------------------

--
-- Structure de la table `high_score`
--

CREATE TABLE `high_score` (
  `high_score_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `score` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `high_score`
--

INSERT INTO `high_score` (`high_score_id`, `name`, `score`, `date`) VALUES
(1, 'JsuisTroFor', 1589, '2022-06-10 14:39:04'),
(2, 'JsuisMoinFor', 2564, '2022-06-10 14:39:04'),
(3, 'Truite', 5456, '2022-06-21 10:50:19');

-- --------------------------------------------------------

--
-- Structure de la table `monster`
--

CREATE TABLE `monster` (
  `monster_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `life` int(11) NOT NULL,
  `att` int(11) NOT NULL,
  `def` int(11) NOT NULL,
  `img` varchar(150) NOT NULL,
  `score` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `monster`
--

INSERT INTO `monster` (`monster_id`, `name`, `life`, `att`, `def`, `img`, `score`, `role`) VALUES
(1, 'Le baveu', 140, 15, 6, 'le_baveu.png', 15, 'lieutenant'),
(2, 'test', 120, 10, 10, 'test.png', 2, 'boss');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `high_score`
--
ALTER TABLE `high_score`
  ADD PRIMARY KEY (`high_score_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `monster`
--
ALTER TABLE `monster`
  ADD PRIMARY KEY (`monster_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `high_score`
--
ALTER TABLE `high_score`
  MODIFY `high_score_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `monster`
--
ALTER TABLE `monster`
  MODIFY `monster_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
