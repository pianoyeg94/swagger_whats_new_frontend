import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';


// Helper functions to encrypt and decrypt items within Local Storage
// NOT SECURE
// Only to protect items stored in the Local Storage from being tampered with by regular users

export const localStorageSetEncryptedObject = (keyName: string, obj: object) => {
  const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(obj), environment.pseudoSecretKey).toString();
  localStorage.setItem(keyName, encryptedObject);
};

export const localStorageGetDecryptedObject = <T>(keyName: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem(keyName), environment.pseudoSecretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    localStorage.removeItem(keyName);
    return null;
  }
};
