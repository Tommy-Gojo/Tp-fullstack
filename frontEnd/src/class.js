import { changeMessageStatus, randomNumber, generateEnemy } from "./generate.js";

class Entity {
    constructor(name, life, att, def, imgPath, nameSelector) {
        this.name = name;
        this.life = life;
        this.att = att;
        this.def = def;
        this.imgPath = imgPath;
        this.nameSelector = nameSelector;
        this.maxLife = this.life;
    }
    //Permet de changer le nom dans le DOM
    setName() {
        let title = document.querySelector(this.nameSelector);
        title.textContent = this.name;
    }

    /**
     * TODO Méthode pour attaquer un adversaire
     * * 1 - Tirer un nombre entre 0 et 100
     *          * si 90 100 attaque * 1.5
     *          * sinon si 0 10 attaque raté
     *          * sinon attaque normale 
     * * 2 - Vérification du status de l'ennemis 
     * * 3 - Si vivant tour de l'ennemis sinon remettre le bouton
     * @param {obj} enemy 
     */
    attack(enemy) {
        let rand = randomNumber();
        if (this.life > 0) {
            if (rand < 10) {
                changeMessageStatus(this.name + " rate son attaque");

            } else if (rand > 90) {
                changeMessageStatus(this.name + " met un coup critique");
                enemy.life -= (this.att * 1.5);
            } else {
                changeMessageStatus(this.name + "Attaque (" + rand + ")");
                enemy.life -= this.att;
            }
        }

        enemy.changeLifeStatus();
        enemy.isDead();
    }

    changeLifeStatus() {
        if (this.life < 40) {
            this.lifeBar.classList.add("is-error")
            this.lifeBar.classList.remove("is-success")
            this.lifeBar.classList.remove("is-warning")

        } else if (this.life < 70) {
            this.lifeBar.classList.add("is-warning")
            this.lifeBar.classList.remove("is-success")
            this.lifeBar.classList.remove("is-error")
        } else {
            this.lifeBar.classList.add("is-success")
            this.lifeBar.classList.remove("is-error")
            this.lifeBar.classList.remove("is-warning")
        }
        this.lifeBar.setAttribute("value", this.life);
    }
    //Permet de changer la profile pic dans le DOM
    setPp() {
        let pp = document.querySelector(".enemy-pp");
        console.log(`set PP ${pp} ${this.imgPath}`);
        pp.src = this.imgPath;
    }
    statusInit() {
        this.lifeBar.setAttribute("max", this.life);
        this.changeLifeStatus();
        this.setName();
        this.setPp();
    }

 
}

class Enemy extends Entity {
    constructor(name = "le clone", life = 80, att = 10, def = 2, imgPath = "img/barzork_clone.png", nameSelector) {
        super(name, life, att, def, imgPath, nameSelector);
        this.lifeBar = document.querySelector("#enemy-bar");
        this.status = 0;
        this.nameSelector = ".enemy-title"
    }
    setName() {
        let title = document.querySelector(this.nameSelector);
        title.textContent = `Barzork ${this.name}`;
    }

    /**
     * TODO: Methode qui créée un ennemis dans le DOM
     * * 1 - ajout class disable sur le bouton générer
     * * 2 - initialisation du status (methode status init)
     * * 3 - Retrait de toutes les classe disable
     */
    displayEnemy() {
        //Selecteur
        let generateButton = document.querySelector(".enemies-generator");
        let allArticles = document.querySelectorAll("article");
        //1
        console.log(generateButton.classList)
        if (!generateButton.classList.contains("disable")) {
            generateButton.classList.toggle("disable");

        }
        //2
        try {
            this.statusInit();

        } catch (e) {
            console.log(e);
        }
        //3
        allArticles.forEach(function (article) {
            article.classList.remove("disable");
        });
    }

    /**
     * TODO: Méthode qui vérifie le status actuel  mort - vivant
     * * 1 - Check la santé
     * * 2 - Si >= 0 alors appel de la méthode Remove ennemie
     */
    isDead() {
        if (this.life <= 0) {
            changeMessageStatus(`${this.name} est mort, du renfort arrive !`);
            this.life = 0;
            return true;
        }
        else {
            return false;
        }
    }
 

}
class Allies extends Entity {
    constructor(name, life, att, def, nameSelector) {
        super(name, life, att, def, nameSelector)
        this.lifeBar = document.querySelector("#allies-bar");
        this.status = 0;
        this.nameSelector = ".allies-pp"
    }
    /**
 * TODO: Méthode qui vérifie le status actuel  mort - vivant
 * * 1 - Check la santé
 * * 2 - Si >= 0 alors appel de la méthode Remove ennemie
 */
    isDead() {
        if (this.life <= 0) {
            changeMessageStatus(`${this.name} est mort, la partie est terminer!`)
            this.life = 0;
            return true;
        } else {
            return false;
        }
    }
    /**
     * TODO: Méthode qui gere le special
     * 
     */
    specialAttack(enemy) {
        let specialAttack = this.att * 3;
        if (this.life > 0) {
            changeMessageStatus("Vous lancer une attaque venus des enfer");
            enemy.life -= specialAttack;

        }

        enemy.changeLifeStatus();
        enemy.isDead();
    }
    /**
     * TODO: Méthode qui rend entre 5 et 25 pourcent de vie lors d'une victoire
     */
    healByVictory() {
        let rand = randomNumber();
        let message = "Grande victoire KROM est fier de vous gagnez";
        /**
        * ! DEBUG
        */
        console.log("nombre tirer" + rand);
        console.log("avant soin" + this.life);
        //


        if (rand < 10) {
            this.life = this.life + (this.maxLife * 25 / 100);

        }
        else if (rand < 20) {
            this.life = this.life + (this.maxLife * 20 / 100);

        }
        else if (rand < 30) {
            this.life = this.life + (this.maxLife * 15 / 100);

        }
        else if (rand < 40) {
            this.life = this.life + (this.maxLife * 10 / 100);
            message = "Cette victoire vous rend quelques point de vie";
        } else {

            this.life = this.life + (this.maxLife * 5 / 100);
            message = "Cette victoire vous rend quelques point de vie";
        }
        /**
         * ! DEBUG
         */
        console.log("après soin" + this.life);
        //
        changeMessageStatus(message);
        if (this.life > this.maxLife) {
            this.life = this.maxLife;
        }
        this.changeLifeStatus();

    }
}

export { Enemy, Allies };