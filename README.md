![Groupomania Icon](/assets/HotTakes%20logo.png) ![Groupomania Icon](/assets/HotTakes%20logo%20reverse.png)

## Construisez une API sécurisée pour une application d'avis gastronomiques - HotTakes

### P6 - OpenClassrooms "Développeur Web"

#### Contexte du projet

Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises. 

La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet. 

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”. L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”. 

Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs. 

Lors de votre premier jour, vous discutez avec elle sur la messagerie instantanée interne de l’entreprise.

![Email](/assets/Email%20HotTakes.png)

La deadline fixée pour la réalisation du projet étant raisonnable, vous décidez d’accepter la mission, sachant que vos connaissances de la stack Node.js, Express et Mongo, et d’OWASP, sont parfaitement adaptées.

Quelques heures plus tard, vous trouvez un post-it de Marc, le développeur frontend, sur votre bureau.

Vous trouvez effectivement [la note de cadrage](./assets/Note%20de%20cadrage.pdf) contenant le détail des routes et recommandations liées à l'API. Vous vous lancez immédiatement !

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

- You will need to have Node and `npm` installed locally on your machine.

> [!WARNING]  
> The [frontend](https://github.com/Alex-Pqn/HotTakes-frontend-ocr_dw) must also be installed in order to launch this project.

---

## Project setup

### Install

```
npm install
```

### Start

The API should run on `localhost` with default port `3000`. 

If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

```
npm run start
```

#### .env

A .env file is present in this project/github repo (for the example).
In a real project, the .env is on server-side and you can't access at this url.

---

### Preview

![Site complet](/assets/HotTakes.png)
<br/>
<br/>
<br/>
![Site complet](/assets/HotTakes%202.png)
