// Utils/AES.Util.js

const crypto = require('crypto');

// Function to encrypt text
const encrypt = (text, key) => {
    const iv = crypto.randomBytes(16); // Generate a random Initialization Vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`; // Return IV and encrypted text as hex
};

// Function to decrypt text
const decrypt = (text, key) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

// Function to encrypt text for database storage (base64 encoded)
const aesEncrypt = (text) => {
    const key = Buffer.from(process.env.SECRET_KEY, 'base64');
    return encrypt(text, key);
};

// Function to decrypt text from database storage (base64 encoded)
const aesDecrypt = (encryptedText) => {
    const key = Buffer.from(process.env.SECRET_KEY, 'base64');
    return decrypt(encryptedText, key);
};

module.exports = {
    encrypt,
    decrypt,
    aesEncrypt,
    aesDecrypt
};
