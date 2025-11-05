// gen-secret.js
import crypto from 'crypto';

// Генерируем 32 байта случайных данных
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Ваш секретный ключ:', secretKey);с