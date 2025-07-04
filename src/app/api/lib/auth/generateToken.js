import jwt from "jsonwebtoken";
import { env } from "../../utils/env";

export function generateToken(
  payload, expiresIn = "1d"
) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}
