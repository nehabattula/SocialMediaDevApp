import crypto from 'crypto';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const configdata = {

    "githubClientId": "903d685408c523816406",
    "githubSecret": "adc127f5043f5d799b184fb312b42efed3aecc8b",
    "cipher": crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)

}

export default configdata;