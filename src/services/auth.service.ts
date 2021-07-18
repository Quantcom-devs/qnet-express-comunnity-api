import bcrypt from 'bcrypt';

export function hashPassword(pwd: string) {
    return bcrypt.hash(pwd, 10);
}

export function comparePasswords(pwd: string, pwdEncrypted: string) {
    return bcrypt.compare(pwd, pwdEncrypted);
}