`Sagara Idriss`
mail1: idriss.sagara@etu.univ-grenoble-alpes.fr
mail2: sagara.idriss@gmail.com
binôme:
 `Mourthadhoi sultan`
mail:sultan.mourthadhoi@etu.univ-grenoble-alpes.fr 
Voyageur de santé
Partie frontend du projet Voyageur de santé.
Les différentes versions supportée par le projet:
Angular CLI: 6.2.5
Node: 8.12.0
OS: darwin x64
@angular-devkit/architect 0.8.5 (cli-only)
@angular-devkit/core 0.8.5 (cli-only)
@angular-devkit/schematics 0.8.5 (cli-only)
@schematics/angular 0.8.5 (cli-only)
@schematics/update 0.8.5 (cli-only)
rxjs 6.2.2 (cli-only) typescript 2.5.3
Installation des dépendances
Précisons que:
-Le serveur ne fait pas parti du dépot Github et l'url pour aller le chercher est “http://localhost:8090/”
- Le projet est dans "Ihhm_Angular/L3M-Client/clientAngular", c'est dans ce répertoire précis qu'il faut lancer le "`npm install`" et le "`npm start`"
•	NodeJs (avec npm) Instructions
•	Angular CLI: Utilitaire en ligne de commande pour créer et gérer des projets Angular 6   Une fois les dépendances installées, 
Lancer le serveur: ”`npm start`” pour un serveur de développement.
Ensuite allez sur http://localhost:4200/.
Page d'accueil formulaire d'authentification:
n'importe quel  nom d’utilisateur et mot de passe peut être utiliser.
exemple: user: idriss, password: sagara
Les modifications que vous ferez ensuite sur les fichiers seront automatiquement prises en compte. Build Lancer ng build pour builder le projet.
Les dépendances utilisées se trouvent dans package.json:
Utilisation des librairies comme:
primeNg, bootsrap, ngx-toastr, font-Awesome Material-angular
Quelques liens utile:
 'http://material.angular.io'; { Beaucoup utiliser Dans la création des formulaires}
'http://primefaces.org'; {Utiliser pour l'insertion d'un dataTable et p-Dialog c'est une librairie assez complète qu'on à aimer }
'http://fontawesome.com'; {Utiliser pour l'insertion des icones}
'http://getbootstrap.com/'; {Pour la responsivité de l'application}
'https://www.npmjs.com/package/ngx-toastr'. {Pour l'affichage des messages après l'exécution des requêtes}
Les components créer et utiliser : Login, Patient-Dialog, Ajout-Patient, Patient, Infirmier, Cabinet, Secretary, Header.
Le routing qui gère la navigation entre les différents composant.
On a respecté le pattern MVVM.
Les tâches demandées: création et édition des patients + affectations des patients aux infirmiers et desaffectation , ont été résolue.
conclusion
Un projet très intéressant avec beaucoup de challenge, nous à permis de prendre en main cet nouveaux langage, et framework complet pour la réalisation de ce projet
__
Partie Backend
Pas de modifications
Le serveur est basé sur NodeJS, il utilise le framework Express. Pour l’exécuter, placez vous dans son répertoire et taper la commande :
npm start


