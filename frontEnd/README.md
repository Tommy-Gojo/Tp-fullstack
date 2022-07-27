# Deuxième partie du projet

En reprenant la correction vous allez réaliser la suite du projet.
Premierement le nom de classe Human n'est pas convenable, changez le et vérifier que tout fonctionne(refacto).

Deplacer ensuite le tableau d'ennemis dans un fichier à part, il faudra l'exporter/importer il est également possible d'utiliser un fetch

Il faudra que le combat fonctionne.
Faite en sorte que les boutons soit désactiver.

Une fois le que la fleche a fait son choix, 
    si le joueur et choisis alors vous pouvez attaquer (activer les bouton)
        attention pensez à faire en sorte de vérifier si le spécial est actif (toutes les 3 attaques il l'est)
            si le spécial est actif alors vous pouvez l'utiliser mais ce n'est pas obligatoire
            une fois lancer le compteur d'attaque retombe a zéro.
    sinon si c'est l'ennemis alors il attaque automatiquement
    
    Votre système d'attaque contiendra une partie aléatoire, fait un 
    jet entre 0 est 100
    Si c'est entre 90 et 100 alors l'attaque est critique att * 1.5
    Si c'est entre 0 et 10 echec l'attaque rate
    Sinon attaque normale.

Une boucle ce fait alors entre attaque joueur / ennemis
    réflechissez bien, je ne parle pas forcement de while 
Pensez à vérifier si l'un des deux est mort ou pas
    si vous êtes mort le jeux s'arrete (pour le moment rien ne se passe, vous ne pouvez juste plus jouer)
    si l'adversaire est mort alors vous placer son image dans une zone de la page (dead zone)
    un nouvel ennemis est alors génerer

Un bug c'est glisser dans le programme, faite en sorte de le résoudre. (En vrai il y en a probablement plusieur)
Regarder votre console pour comprendre de quoi je parle 

BONUS

Ajouter une méthode qui rend aléatoirement entre 5% et 25% de vie
Cette méthode s'enclenche lorsque le joueur bat un ennemis
Vous allez définir les plage pour rendre de la vie
    moins de 10 par exemple rend 25% de vie
à vous de jouer