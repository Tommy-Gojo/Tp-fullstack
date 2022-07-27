<?php

class Monster {
    private $id;
    private $name;
    private $life;
    private $att;
    private $def;
    private $img;
    private $score;
    private $role;

    public function __construct($id,$name,$life,$att,$def,$img,$score,$role) {
        $this->id = $id;
        $this->name = $name;
        $this->life = $life;
        $this->att = $att;
        $this->def = $def;
        $this->img = $img;
        $this->score = $score;
        $this->role = $role;
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
     * Get the value of life
     */ 
    public function getLife()
    {
        return htmlspecialchars($this->life);
    }

    /**
     * Get the value of att
     */ 
    public function getAtt()
    {
        return htmlspecialchars($this->att);
    }

    /**
     * Get the value of def
     */ 
    public function getDef()
    {
        return htmlspecialchars($this->def);
    }

    /**
     * Get the value of img
     */ 
    public function getImg()
    {
        return htmlspecialchars($this->img);
    }

    /**
     * Get the value of score
     */ 
    public function getScore()
    {
        return htmlspecialchars($this->score);
    }

    /**
     * Get the value of role
     */ 
    public function getRole()
    {
        return htmlspecialchars($this->role);
    }
}