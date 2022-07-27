import { Allies } from "./class.js";
import {
  randomNumber,
  generateEnemy,
  changeMessageStatus,
  isItNullOrUndefined,
  addMonsterInDeadZone
} from "./generate.js";
import { enemiesList } from "./data.js";


  fetch('http://localhost/fighting_surface_api/scores')
  .then(res => res.json())
  .then( function (data){
    console.log(data)
  });



// console.log(`${this.name}`);
//Gere le tour true = joueur, false = enemy
let actualTurn = true;
//Permet de gerer l'appuie sur le bouton attack
let canAttack = true;
//Gestion special
let howMuchAttack = 0;
let special = false;
//Les entités
let hero = null;
let actualEnemy;

/**
 * SELECTEUR DE BASES
 */
let newEnemy = document.querySelector(".enemies-generator");
let arrowSelector = document.querySelector(".turn-arrow > img");
let attackBtn = document.querySelector(".attack-js");
let specialBtn = document.querySelector(".special-js");
let imgArc = document.querySelector(".blockImg");
let btnPlay = document.querySelector(".menuPlay");
let btnScores = document.querySelector(".menuScores");
let btnCredit = document.querySelector(".menuCredit");
let disableAll = document.querySelectorAll(".disable");
let animeStarterFight = document.querySelector(".animeStarterFight")
let tabAcc = document.querySelector(".divAcc");
let tabScores = document.querySelector(".divScores")
let tabCredit = document.querySelector(".divCred")
let scoresUsers = document.querySelector("#scoresUsers")

function createScore(){
  let pseudo = document.createElement('p')
  let scores = document.createElement('p')
  let times = document.createElement('p')
  let date = document.createElement('p')
  scoresUsers.appendChild(pseudo)
  scoresUsers.appendChild(scores)
  scoresUsers.appendChild(times)
  scoresUsers.appendChild(date).innerHTML
}

createScore()
//Lancement du jeux
beginTheGame();

/**
 * ! SUITE
 * TODO: 
 */

/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton play du menu
 * * 1 - Fait disparaitre le menu et apparaitre le jeux
 * 
 */
// console.log (`${this.name}`)
 console.log(disableAll)
btnPlay.addEventListener("click", function () {
  console.log("cb");


    disableAll[1].classList.remove("disable")
    disableAll[2].classList.remove("disable")
    setTimeout(() => {
      tabCredit.classList.add("disable")
      disableAll[1].classList.remove("animeStarterFight")
      disableAll[2].classList.remove("animeStarterFight")
      disableAll[1].classList.add("animeFight")
      disableAll[2].classList.add("animeFight")
    }, 2000)
    
  imgArc.classList.add("animeImgArc");
  btnPlay.classList.add("disableStyle");
  btnScores.classList.add("disableStyle");
  btnCredit.classList.add("disableStyle");



  
  setTimeout(() => {
    imgArc.classList.add("disable");
    btnPlay.classList.add("disable");
    btnScores.classList.add("disable");
    btnCredit.classList.add("disable");
  }, 2000)
})






/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton highscore du menu
 * * 1 - Fait disparaitre le menu et apparaitre le tableau
 */


btnScores.addEventListener("click",function(){
  tabAcc.classList.add("disable")
  disableAll[0].classList.remove("disable")
  imgArc.classList.add("animeImgArc");
  btnPlay.classList.add("disableStyle");
  btnScores.classList.add("disableStyle");
  btnCredit.classList.add("disableStyle");
  tabAcc.classList.add("disableStyle");
  tabScores.classList.add("animeFight");
  setTimeout(() => {
    tabScores.classList.remove("disable");
    imgArc.classList.add("disable");
    btnPlay.classList.add("disable");
    btnScores.classList.add("disable");
    btnCredit.classList.add("disable");
    tabAcc.classList.add("disable");
    tabScores.classList.remove("animeStarterFight");
  }, 2000)

})





/**
 * ! SUITE
 * TODO: Evenement pour gerer le bouton crédit du menu
 * * 1 - Fait disparaitre le menu et apparaitre le crédit
 */


 btnCredit.addEventListener("click",function(){
  imgArc.classList.add("animeImgArc");
  btnPlay.classList.add("disableStyle");
  btnScores.classList.add("disableStyle");
  btnCredit.classList.add("disableStyle");
  tabCredit.classList.remove("disable");
  tabAcc.classList.add("disableStyle");
  setTimeout(() => {
    tabCredit.classList.add("animeFight");
    imgArc.classList.add("disable");
    tabAcc.classList.add("disable");
    btnPlay.classList.add("disable");
    btnScores.classList.add("disable");
    btnCredit.classList.add("disable");
    tabCredit.classList.remove("animeStarterFight");
    
  }, 2000)

})





/**
 * TODO: Evenement qui lance un combat
 * * 1 - Generer un adversaire - change le message barre status
 * * 2 - Changer le status en round lancer
 * * 3 - Tirer aléatoirement le tour (joueur ou adv)
 */

/**
 * 
 *  TODO: Ce code à un soucis - fait en sorte d'attaquer dans le if (verification null undefined)
 *  TODO: Evenement qui gère l'attaque
 */
attackBtn.addEventListener("click", function () {

  if (actualTurn === true && hero.isDead() === false && canAttack === true) {
    canAttack = false;

    changeColorSpecial();
    if (actualEnemy === null || actualEnemy === undefined) {
    } else {
      hero.attack(actualEnemy);
      //Changin color of btn
      removeOrAddAttack();
      changeArrowDirection()
      howMuchAttack++;
      special = checkSpecial(howMuchAttack);
    }

    setTimeout(function () {
      actualEnemy.attack(hero);
      if (actualEnemy.isDead() === false && hero.isDead() === false) {
        changeArrowDirection("allies");
        changeColorSpecial();
      } else if (actualEnemy.isDead() === true) {
        hero.healByVictory();
        addMonsterInDeadZone(actualEnemy);
        actualEnemy = generateEnemy(enemiesList);
        newRound();

      }
      canAttack = true;

    }, 2000);

  } else {
    console.log("vous ne pouvez pas attaquer")

  }
});

/**
 * TODO: Evenement qui gère le spécial
 *
 */
specialBtn.addEventListener("click", function () {
  if (special === true) {
    if (actualTurn === true && hero.isDead() === false && canAttack === true) {
      canAttack = false;
      hero.specialAttack(actualEnemy);
      howMuchAttack = 0;
      changeArrowDirection();
      special = false;
    }

    setTimeout(function () {

      if (actualEnemy.isDead() === false && hero.isDead() === false) {
        actualEnemy.attack(hero);
        changeArrowDirection("allies");

      } else if (actualEnemy.isDead() === true) {
        hero.healByVictory();
        addMonsterInDeadZone(actualEnemy);
        actualEnemy = generateEnemy(enemiesList);
        newRound();
      } else {

      }
      canAttack = true;
    }, 2000);

  } else {
    changeMessageStatus("Le spécial n'est pas encore prêt !")
  }

});
/**
 * TODO: Evènement qui ajoute un enemy et lance une manche 
 */
newEnemy.addEventListener("click", function () {
  
  try {
    //1
    actualEnemy = generateEnemy(enemiesList);

    //
    newRound();
  } catch (error) {
    console.error(`Une erreur est survenue ${error}`);
    console.log(error);
  }
});

/**
 * TODO : Instanciation du héros, ICI démarre le JEUX 
 */
function beginTheGame() {
  //*Le bug ce trouve ici, il manquais un argument, le chemin vers l'image
  //*Le code pourrait être améliorer, il y a des soucis dans l'organisation selon moi
  if (!isItNullOrUndefined(hero)) {
    hero = new Allies("Jeanjean", 100, 60, 3, "");
    hero.statusInit();
  }
}
/**
 * TODO: Permet de mettre ou retirer la possibilité d'attaquer
 * @param {String} action
 */
function removeOrAddAttack(action = "", special = false) {
  if (action === "add") {
    console.log("add attack");
    attackBtn.classList.add("is-error");
    attackBtn.classList.remove("is-disabled");
  } else {
    console.log("remove attack");
    attackBtn.classList.remove("is-error");
    attackBtn.classList.add("is-disabled");
  }
  if (special === true) {
    console.log("add special");
    specialBtn.classList.add("is-primary");
    specialBtn.classList.remove("is-disabled");
  } else {
    console.log("remove special");
    specialBtn.classList.remove("is-primary");
    specialBtn.classList.add("is-disabled");
  }
}

/**
 * TODO: fonction qui change la fleche de direction
 * *   Prend une direction en argument
 * *   La fleche tourne lentement vers l'ennemis
 * @param { STRING }
 * @return { VOID }
 */

function changeArrowDirection(direction = "") {
  if (direction === "allies") {
    console.log("Dans change Arrow Direction: Tour du héro");
    if (arrowSelector.classList.contains("quick-allies-turn")) {
      arrowSelector.classList.add("allies-turn");
      arrowSelector.classList.remove("quick-allies-turn");

    } else {
      arrowSelector.classList.add("allies-turn");

      arrowSelector.classList.remove("quick-allies-turn");
    }
    arrowSelector.classList.remove("quick-enemy-turn");
    arrowSelector.classList.remove("enemy-turn");

  } else {
    console.log("Dans change Arrow Direction: Tour de l'ennemie");
    arrowSelector.classList.add("enemy-turn");
    arrowSelector.classList.remove("quick-allies-turn");
    arrowSelector.classList.remove("allies-turn");

    arrowSelector.classList.remove("quick-enemy-turn");
  }
}
/**
 * TODO: fonction qui change la fleche de direction démarrage du jeux ou d'un round
 * *    Selon un nombre aléatoire définis qui commence
 * *
 */
function newRound() {

  let rand = randomNumber();
  rand = 49;
  if (rand <= 50) {
    changeMessageStatus("c'est vous qui commencer");
    changeArrowDirection("allies");
    //Changin color of btn
    changeColorSpecial();

  } else {
    changeMessageStatus("c'est l'ennemis qui commence");
    changeArrowDirection();
    setTimeout(function () {
      actualEnemy.attack(hero);
      changeArrowDirection("allies");
      changeColorSpecial();
    }, 3000);

  }
}

/**
 * TODO: Fonction/méthode qui vérifie si le joueur à un special graçe au compteur d'attaque
 * @param { Number } 
 * @return { Boolean }
 */
function checkSpecial(attackCount) {
  if (attackCount >= 3) {
    return true;
  } else {
    return false;
  }
}

/**
 * TODO: Fonction qui active ou non le btn special
 * @return { VOID }
 */
function changeColorSpecial() {
  if (checkSpecial(howMuchAttack)) {
    removeOrAddAttack("add", true);
  } else {
    removeOrAddAttack("add");

  }
}

/**
 * Mettre en place un pierre feuille sciseaux, 
 */