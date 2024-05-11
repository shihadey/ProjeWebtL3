const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Création d'une connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'adminwebmarkeplace',
    password: '198673476',
    database: 'webmarkeplace',
});

// Vérification de la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à MySQL:', err);
    return;
  }
  console.log('Connexion à MySQL réussie');
});

// Route de test
app.get('/', (req, res) => {
  res.send('Bonjour depuis le serveur backend !');
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
