import crypto from 'crypto';

const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Ваш секретный ключ:', secretKey);с