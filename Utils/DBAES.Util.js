// Utils/DBAES.Util.js

const crypto = require('crypto');

// Function to encrypt text for database storage
const aesEncrypt = (text) => {
    const key = Buffer.from(process.env.DB_SECRET_KEY, 'base64'); // Assuming you have a DB-specific secret key
    const iv = crypto.randomBytes(16); // Generate a random Initialization Vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`; // Return IV and encrypted text as hex
};

// Function to decrypt text retrieved from database
const aesDecrypt = (encryptedText) => {
    const key = Buffer.from(process.env.DB_SECRET_KEY, 'base64'); // Assuming you have a DB-specific secret key
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encrypted = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

module.exports = {
    aesEncrypt,
    aesDecrypt
};
