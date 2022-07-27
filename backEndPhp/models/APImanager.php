<?php

require_once "Model.php";
require_once "MonsterClass.php";
require_once "ScoreClass.php";

class ApiManager extends Model
{

    public function getMonstersDB()
    {
        $sql = "SELECT * FROM monster";
        $stmt = $this->getDB()->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        foreach ($data as $value) {
            $monster = new Monster($value->monster_id, $value->name, $value->life, $value->att, $value->def, $value->img, $value->score, $value->role);
            $monsters[] = $monster;
        }
        return $monsters;
    }

    public function getMonsterByIdDB($id)
    {
        $sql = "SELECT * FROM monster WHERE monster_id = :id";
        $stmt = $this->getDB()->prepare($sql);
        $stmt->execute([
            ":id" => $id
        ]);
        $data = $stmt->fetch(PDO::FETCH_OBJ);
        if ($data) {
            $monster = new Monster($data->monster_id, $data->name, $data->life, $data->att, $data->def, $data->img, $data->score, $data->role);
            return $monster;
        } else {
            return null;
        }
    }

    public function getScoresDB()
    {
        $sql = "SELECT * FROM high_score ORDER BY score DESC LIMIT 10";
        $stmt = $this->getDB()->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        foreach ($data as $value) {
            $score = new Score($value->high_score_id, $value->name, $value->score, $value->date);
            $scores[] = $score;
        }
        return $scores;
    }

    public function addScoreDB($name, $score)
    {
        $sql = "INSERT INTO high_score (name,score) VALUES (:name,:score)";
        $stmt = $this->getDB()->prepare($sql);
        $result = $stmt->execute([
            ":name" => $name,
            ":score" => $score
        ]);
        return $result;
    }

    public function getPlayerScoreDB($name)
    {
        $sql = "SELECT * FROM high_score WHERE name = :name";
        $stmt = $this->getDB()->prepare($sql);
        $stmt->execute([
            ":name" => $name
        ]);
        $data = $stmt->fetch(PDO::FETCH_OBJ);
        if ($data) {
            $score = new Score($data->high_score_id, $data->name, $data->score, $data->date);
            return $score;
        } else {
            return null;
        }
    }

    public function deleteScoreDB($name)
    {
        $sql = "DELETE FROM high_score WHERE name = :name";
        $stmt = $this->getDB()->prepare($sql);
        $stmt->execute([
            ":name" => $name
        ]);
    }

    public function getPlayerNameDB($name) {
        $sql = "SELECT name FROM high_score WHERE name = :name";
        $stmt = $this->getDB()->prepare($sql);
        $stmt->execute([
            ":name" => $name
        ]);
        $data = $stmt->fetch(PDO::FETCH_OBJ);
        if ($data) {
            return $data;
        } else {
            return null;
        }
    }

    public function updateScoreDB($score,$name) {
        $sql = "UPDATE high_score SET score = :score WHERE name = :name";
        $stmt = $this->getDB()->prepare($sql);
        if($stmt->execute([":score" => $score,":name" => $name])) {
            return true;
        } else {
            return false;
        }
    }
}
