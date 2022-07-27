<?php

require_once "controllers/APIcontroller.php";

define("URL", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? " https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]"));

$apiController = new ApiController();

try {

    if (empty($_GET['page'])) {
        throw new Exception('Error 404 page not found. Wrong way');
    } else {
        $url = explode("/", filter_var($_GET['page']), FILTER_SANITIZE_URL);
        switch ($url[0]) {
            case "monsters":
                $apiController->getMonsters();
                break;
            case "monster":
                if (!empty($url[1])) {
                    $apiController->getMonsterById($url[1]);
                } else {
                    throw new Exception("Veuillez spécifier l'id du monstre à afficher");
                }
                break;
            case "scores":
                if (empty($url[1])) {
                    $apiController->getScores();
                } else {
                    $apiController->getPlayerScore($url[1]);
                }
                break;
            case "add":
                $apiController->addScore();
                break;
            case "deleteScore":
                $apiController->deleteScore();
                break;
            case "modifScore":
                $apiController->updateScore();
                break;
            default:
                throw new Exception("Cette URL n'existe pas, veuillez vous référer à la doc de l'API");
        }
    }
} catch (Exception $e) {
    $apiController->error($e->getMessage());
}

