-- Requetes pour tester


-- Affichage high score complet 
SELECT * FROM `high_score`
INNER JOIN `class` using (id_class);

-- Affichage high score Juste les valeur utiles (player_name score_high_score date_high_score name_class) 
SELECT player_name_high_score, score_high_score, date_high_score, name_class FROM `high_score`
INNER JOIN `class` ON high_score.id_class = class.id_class

-- Même requete mais elle trie les score du plus grand au plus petit et garde uniquement les cinq premier
SELECT player_name_high_score, score_high_score, date_high_score, name_class FROM `high_score`
INNER JOIN `class` ON high_score.id_class = class.id_class
ORDER BY score_high_score DESC
LIMIT  5