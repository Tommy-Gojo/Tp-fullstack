<?php

class Score {
    private $id;
    private $name;
    private $score;
    private $date;

    public function __construct($id,$name,$score,$date) {
        $this->id = $id;
        $this->name = $name;
        $this->score = $score;
        $this->date = $date;
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return htmlspecialchars($this->id);
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return htmlspecialchars($this->name);
    }

    /**
     * Get the value of score
     */ 
    public function getScore()
    {
        return htmlspecialchars($this->score);
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return htmlspecialchars($this->date);
    }
}