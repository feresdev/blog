import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { AuthError } from "../../utils/errors";
import { env } from "../../utils/env";

export function verifyToken(token) {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthError("Token expirado");
    }

    if (error instanceof JsonWebTokenError) {
      throw new AuthError("Token inválido");
    }

    throw new AuthError("Error al verificar el token");
  }
}
