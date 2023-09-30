import bcrypt from "bcrypt";

export function hashPass(password) {
  return bcrypt.hash(password, 10);
}

export function comparePass(password, hash) {
  return bcrypt.compare(password, hash);
}