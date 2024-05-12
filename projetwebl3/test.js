const crypto = require('crypto');

// Générer une clé secrète de 64 caractères hexadécimaux (correspondant à 32 octets)
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);