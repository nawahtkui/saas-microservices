import bcrypt from "bcryptjs";

export async function hashPassword(password, rounds = 10) {
  return bcrypt.hash(password, rounds);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
