import jwt from "jsonwebtoken";

export function signToken({ sub, role }, secret, expiresIn) {
  return jwt.sign({ sub, role }, secret, { expiresIn });
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
