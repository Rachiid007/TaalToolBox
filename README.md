# TaalToolBox App

TaalToolBox App est une application web et mobile axée sur l'apprentissage des langues.

Cette application est développée dans le cadre du cours "Projet d'intégration" du bachelier Technologie de l'informatique à l'EPHEC.

Ce projet utilise le Framework [Vue.js 3](https://vuejs.org/) pour le Frontend, l'environnement
d'exécution NodeJS pour le backend et une base de données PostgreSQL pour la persistance des données.

## Pré-requis :warning:

- NodeJS & npm
- Docker

## Installation :hammer:

Clonez le repository GitHub dans un dossier de votre choix :

```
git clone https://github.com/Rachiid007/TaalToolBox
```

Déplacez-vous dans le dossier du projet :

```
cd TaalToolBox
```

## Démarrage :rocket:

### VScode :wrench:

Pour éviter les erreurs, veuillez installer l'extension [Vue Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) et [activer le mode Takeover](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) uniquement sur l'espace de travail !

### Frontend (Vue.js 3) :computer:

Rendez-vous dans le répertoire _WEB_, ouvrez une console et lancez la commande `npm install` pour installer les dépendances et `npm run dev` pour lancer l'application en mode développement. L'application sera accessible à l'adresse `http://127.0.0.1:5173/`.

### Docker :whale:

1. Veuillez créer un fichier `.env` dans le répertoire _BACKEND_ et y ajouter les informations suivantes :

```env
POSTGRES_PASSWORD=
```

2. Lancer Docker et ouvrez une console dans le répertoire _BACKEND_ et lancez la commande `docker-compose up -d` pour lancer la base de données en mode deamon (en arrière plan). Une base de données PostgreSQL sera alors accessible à l'adresse `http://localhost:5432`. Vous pouvez interagir avec la base de données via le mode intéractif de Docker en lançant la commande `docker exec -it taaltoolbox_db_1 psql -U postgres`.

### Backend (NestJS) :computer:

Ouvrez une console dans le répertoire _BACKEND_ et lancez la commande `npm install` pour installer les dépendances et `npm run start:dev` pour lancer le serveur. Celui-ci sera accessible à l'adresse `http://localhost:3000`.

Veillez garder toutes les consoles ouvertes pour que l'application fonctionne correctement. :wink:
