<?php

require_once "models/APImanager.php";

class ApiController
{

    private $apiManager;

    public function __construct()
    {
        $this->apiManager = new ApiManager();
    }

    public function getMonsters()
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] === "GET") {

            $monsters = $this->apiManager->getMonstersDB();
            $tab = [];

            foreach ($monsters as $value) {
                if (!array_key_exists($value->getId(), $tab)) {
                    $tab[$value->getId()] = [
                        "id" => $value->getId(),
                        "name" => $value->getName(),
                        "life" => $value->getLife(),
                        "att" => $value->getAtt(),
                        "def" => $value->getDef(),
                        "img" => URL . "public/images/" . $value->getImg(),
                        "score" => $value->getScore(),
                        "role" => $value->getRole()
                    ];
                }
            }

            $this->sendJson($tab);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function getMonsterById($id)
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] == "GET") {

            $monster = $this->apiManager->getMonsterByIdDB($id);

            if ($monster) {

                $tab = [
                    "id" => $monster->getId(),
                    "name" => $monster->getName(),
                    "life" => $monster->getLife(),
                    "att" => $monster->getAtt(),
                    "def" => $monster->getDef(),
                    "img" => URL . "public/images/" . $monster->getImg(),
                    "score" => $monster->getScore(),
                    "role" => $monster->getRole()
                ];

                $this->sendJson($tab);
            } else {
                throw new Exception("Le monstre que vous recherchez n'existe pas");
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function error($msg)
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");

        http_response_code(404);
        $err = ["message" => $msg];
        echo json_encode($err);
    }

    public function getScores()
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] == 'GET') {

            $scores = $this->apiManager->getScoresDB();

            $tab = [];
            $count = 1;

            foreach ($scores as $value) {
                $tab[$count] = [
                    "id" => $value->getId(),
                    "name" => $value->getName(),
                    "score" => $value->getScore(),
                    "date" => $value->getDate(),
                ];
                $count++;
            }

            $this->sendJson($tab);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function sendJson($data)
    {
        http_response_code(200);
        echo json_encode($data);
    }

    public function addScore(){
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $data = json_decode(file_get_contents("php://input"));
            $result = $this->apiManager->addScoreDB($data->name, $data->score);
            if ($result) {
                http_response_code(201);
                echo json_encode(["message" => "L'ajout a bien été effectué"]);
            } else {
                throw new Exception("Erreur lors de l'envoie de la requete");
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function getPlayerScore($name)
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] == 'GET') {

            if (is_string($name)) {
                $score = $this->apiManager->getPlayerScoreDB($name);

                if ($score === null) {
                    throw new Exception("Le joueur recherché n'est pas enregistré dans le tableau des scores");
                }

                $tab = [
                    "id" => $score->getId(),
                    "name" => $score->getName(),
                    "score" => $score->getScore(),
                    "date" => $score->getDate(),
                ];

                $this->sendJson($tab);
            } else {
                http_response_code(415); // Pour ce code d'erreur je suis clairement pas sur du tout ! :x
                echo json_encode(["message" => "Le nom du joueur recherché doit être une chaîne de caractères"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function deleteScore()
    {
        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: DELETE");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");


        if ($_SERVER['REQUEST_METHOD'] === "DELETE") {

            $player = json_decode(file_get_contents("php://input"));

            if (!empty($player)) {

                $properties = get_object_vars($player);

                if (count($properties) < 2) {
                    throw new Exception("Il manque des informations");
                }

                foreach ($properties as $key => $value) {
                    if ($key !== "key" && $key !== "name") {
                        throw new Exception("Vous devez renseigner seulement un nom et une clef, rien de plus");
                    }
                    if (!is_string($value)) {
                        throw new Exception("Cette requête n'accepte que des chaines de caractères");
                    }
                }

                if ($player->key === "cmoiladmin") {

                    $name = $this->apiManager->getPlayerNameDB($player->name);

                    if ($name) {
                        $this->apiManager->deleteScoreDB($name->name);
                        http_response_code(204);
                    } else {
                        throw new Exception("Ce player n'existe pas");
                    }
                } else {
                    http_response_code(401);
                    echo json_encode(["message" => "Vous n'avez pas l'autorisation nécessaire"]);
                }
            } else {
                throw new Exception("Vous devez renseigner le nom d'un joueur et votre clef");
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function updateScore() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-resquested-With");

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            
            $player = json_decode(file_get_contents("php://input"));
            $result = $this->apiManager->getPlayerNameDB($player->name);

            if ($result) {
                $test = $this->apiManager->updateScoreDB($player->score,$player->name);
                if ($test === true) {
                    http_response_code(200);
                    echo json_encode(["message" => "Score modifié avec succès"]);
                } else {
                    throw new Exception("Une erreur est survenue lors de la modification");
                }
            } else {
                $this->apiManager->addScoreDB($player->name,$player->score);
                http_response_code(201);
                echo json_encode(["message" => "Nouveau score ajouté"]);
            }
            
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée" . $_SERVER["REQUEST_METHOD"]]);
        }
    }
}
