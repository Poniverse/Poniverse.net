import crypto from "crypto";

export function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.APP_KEY);
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');

  return crypted;
}

export function decrypt(text) {
  const cipher = crypto.createDecipher('aes-256-cbc', process.env.APP_KEY);
  let crypted = cipher.update(text, 'base64', 'utf8');
  crypted += cipher.final('utf8');

  return crypted;
}
