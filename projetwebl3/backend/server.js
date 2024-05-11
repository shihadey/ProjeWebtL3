const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
//pour le token d'autentification
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
const port = 3000;

// Utilisez le middleware cors pour autoriser les requêtes CORS
app.use(cors());

// Vos autres configurations et routes ici...


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


// Route pour l'inscription
app.post('/register', (req, res) => {
  console.log('Requête POST reçue à /register:', req.body);
  const { username, email, password } = req.body;

  // Vérification si l'utilisateur existe déjà
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }

    if (results.length > 0) {
      // L'utilisateur existe déjà
      res.status(409).json({ message: 'L\'utilisateur existe déjà' });
    } else {
      // Insérer le nouvel utilisateur dans la base de données
      connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error) => {
        if (error) {
          console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
          res.status(500).json({ message: 'Erreur serveur' });
          return;
        }
        res.json({ message: 'Inscription réussie' });
      });
    }
  });
});


// Route pour l'authentification
app.post('/login', (req, res) => {
  console.log('Requête POST reçue à /login:', req.body);
  const { email, password } = req.body;

  // Vérification des identifiants dans la base de données
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification des identifiants:', error);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }

    if (results.length > 0) {
      // Utilisateur authentifié avec succès
      res.json({ message: 'Authentification réussie' });
    } else {
      // Identifiants invalides
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  });
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
