import CryptoJS from 'crypto-js';
import secretKey from './secretKey';

const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
};

export default encryptData;
