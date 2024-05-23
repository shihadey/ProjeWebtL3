const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
//pour le token d'autentification
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const my_secret_key = "675c893029cd2b77c8a6ec2c7da433e0b54239aed8163b7cdde05897a913951e";

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

// Middleware pour servir les fichiers statiques
// app.use(express.static(path.join(__dirname, 'dist')));

// Route pour l'inscription
app.post('/register', (req, res) => {
  console.log('route register', req.body);
  const { username, email, password } = req.body;

  // Hacher le mot de passe avant de l'enregistrer dans la base de données
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe:', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }

    // Enregistrer l'utilisateur dans la base de données avec le mot de passe haché
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (error, results) => {
      // console.log("mdp haché", hash);
      if (error) {
        console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }

      // Récupérer l'ID de l'utilisateur nouvellement inséré
      // récupère le role de l'user crée
      connection.query('SELECT * FROM users WHERE email =?', [email], (error, results) => {
        if (error) {
          console.error('Erreur lors de la récupération du role de l\'utilisateur:', error);
          res.status(500).json({ message: 'Erreur serveur' });
          return;
        }
        // console.log("role de l'user crée", results[0].role_id);
        const res_role = results[0].role;
        const userId = results[0].id;
        // Authentification réussie, générer un token JWT avec l'ID de l'utilisateur
        const token = jwt.sign({ userId: userId, username: username, role: res_role }, my_secret_key, { expiresIn: '1h' });    
        res.status(200).json({ token, role: res_role });
      });
    });
  });
});

//Modifier le Mot de passe tadaaaa
// ===================================

// Endpoint to change password
app.post('/change-password', (req, res) => {
  console.log('route chpw', req.body);
  const { email, currentPassword, newPassword } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification des identifiants:', error);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
  
    if (results.length > 0) {
      // Utilisateur trouvé, vérifier le mot de passe
      const user = results[0];
      bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe:', err);
          res.status(500).json({ message: 'Mot de passe invalide' });
          return;
        }
      });
    } else {
      // Utilisateur non trouvé
      res.status(401).json({ message: 'Identifiants invalides' });
    }
    // Hash the new password
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
          console.error(err);
          return;
      }
  
      // Update the password in the database

     connection.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (err, results) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.status(200).json({ message: 'Password updated successfully' });
    })
  });
     

  });
  // Fetch the current password hash from the database
  // connection.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
  //   if (err) {
  //     console.error('Error fetching user:', err);
  //     return res.status(500).json({ message: 'Server error' });
  //   }

  //   if (results.length === 0) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   const currentPasswordHash = results[0].password;

  //   // Compare the current password with the hash
  //   const match = await bcrypt.compare(currentPassword, currentPasswordHash);
  //   if (!match) {
  //     return res.status(400).json({ message: 'Current password is incorrect' });
  //   }

  //   // Hash the new password
  //   const newPasswordHash = await bcrypt.hash(newPassword, 10);

  //   // Update the password in the database
  //   db.query('UPDATE users SET password = ? WHERE id = ?', [newPasswordHash, userId], (err, results) => {
  //     if (err) {
  //       console.error('Error updating password:', err);
  //       return res.status(500).json({ message: 'Server error' });
  //     }

  //     res.status(200).json({ message: 'Password updated successfully' });
  //   });
  // });
});

// End of change password
//..................................

// Route pour l'authentification
app.post('/login', (req, res) => {
  console.log('route login', req.body);
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification des identifiants:', error);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
  
    if (results.length > 0) {
      // Utilisateur trouvé, vérifier le mot de passe
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe:', err);
          res.status(500).json({ message: 'Erreur serveur' });
          return;
        }
        if (isMatch) {
          // Mot de passe correct, générer un token JWT avec l'ID de l'utilisateur
          const userId = user.id;
          const res_role = user.role;
          const res_username = user.username;
          // Authentification réussie, générer un token JWT avec l'ID de l'utilisateur
          const token = jwt.sign({ userId: userId, username: res_username, role: res_role }, my_secret_key, { expiresIn: '1h' });    
          res.status(200).json({ token, role: res_role });
        } else {
          // Mot de passe incorrect
          res.status(401).json({ message: 'Identifiants invalidesBE' });
        }
      });
    } else {
      // Utilisateur non trouvé
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  });
});


// Middleware pour vérifier le rôle de l'utilisateur dans la base de données
function checkUserRole(req, res, next) {
  console.log("Checking authorization", req.headers);
  const token = req.headers.authorization;
  if (token) {
    // Décodez le token JWT pour obtenir les informations de l'utilisateur
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.userId) {
      const userId = decodedToken.userId;
      // Vérifiez le rôle de l'utilisateur dans la base de données
      connection.query('SELECT role FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          console.error('Erreur lors de la vérification du rôle de l\'utilisateur:', error);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        // Vérifiez si l'utilisateur a le rôle d'administrateur
        if (results.length > 0 && results[0].role === 'ADMIN') {
          // Si l'utilisateur a le rôle d'administrateur, passez à la route suivante
          next();
        } else {
          // Si l'utilisateur n'est pas administrateur, renvoyer une erreur d'autorisation
          return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas autorisé à accéder à cette ressource.' });
        }
      });
    } else {
      // Si le token JWT est invalide, renvoyer une erreur d'authentification
      return res.status(401).json({ message: 'Non authentifié. Veuillez vous connecter pour accéder à cette ressource.' });
    }
  } else {
    // Si aucun token n'est fourni, renvoyer une erreur d'authentification
    return res.status(401).json({ message: 'Non authentifié. Veuillez vous connecter pour accéder à cette ressource.' });
  }
}

// Exemple d'utilisation du middleware pour restreindre l'accès à une route spécifique
app.get('/AdminDashboard', checkUserRole, (req, res) => {
  // Cette route ne sera accessible que par les utilisateurs avec le rôle d'administrateur
  console.log('route AdminDashboard demandée');
  res.json({ message: 'Bienvenue sur le tableau de bord de l\'administrateur.' });
});

// Redirection des routes non gérées vers index.html (pour le mode "history" de Vue Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});

