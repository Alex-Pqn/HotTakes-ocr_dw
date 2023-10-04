![Groupomania Icon](/assets/HotTakes%20logo.png) ![Groupomania Icon](/assets/HotTakes%20logo%20reverse.png)

## Construisez une API sécurisée pour une application d'avis gastronomiques - HotTakes

### P6 - OpenClassrooms "Développeur Web"

#### Contexte du projet

So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

Les utilisateurs pourront aussi se créer un compte, se connecter avec leurs identifiants ainsi que modifier ou supprimer leurs propres sauces.

#### Objectifs
- Création d'une API REST avec le framework Express sous Node.js
- Création d'une base de données MongoDB
- Opérations de l'API sur la base de données grâce à l'ODM Mongoose
- Respect des opérations CRUD
- Mot de passe hashé avec Bcrypt
- Models de données pour formatter et valider les données entrantes
- Mise en place de middlewares
  - Authentification des utilisateurs
  - Formattage des images enregistrées sur le serveur
- Architecture des dossiers et fichiers respectée (middlewares, controllers, models, routes)
- Standards OWASP appliqués

---

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

---

### Install

Clone this repo. From within the project folder, run `npm install`.

### Start

You can start the back express part with `npm run start` in backend folder. The server should run on localhost with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts (ex: Listening on port 3000)

### The front-end app can be installed [here](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)

#### .env

A .env file is present in this project/github repo (for the example).
In a real project, the .env is on server-side and you can't access at this url.

---

### Preview

![Site complet](/assets/HotTakes%20P6%20OCR%20DW.png)
<br/>
<br/>
<br/>
![Site complet](/assets/HotTakes%202%20P6%20OCR%20DW.png)
