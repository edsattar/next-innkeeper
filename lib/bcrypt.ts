import bcrypt from "bcrypt";

export function hashPass(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePass(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}