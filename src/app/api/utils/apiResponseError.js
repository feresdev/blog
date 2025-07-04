import apiResponse from "./apiResponse";
import { AuthError } from "./errors";

const isProd = process.env.NODE_ENV === "production";

export default function apiResponseError(error) {
  // Si es un error del JWT
  if (error instanceof AuthError) {
    return apiResponse(
      { data: null, error: error.message, msg: "No autorizado" },
      { status: 401 }
    );
  }

  // Cualquier otro error
  const errMsg = error instanceof Error ? error.message : "Error desconocido";
  console.error("Error:", errMsg);

  return apiResponse(
    {
      data: null,
      error: isProd ? "Error inesperado" : errMsg,
      msg: "Error interno del servidor",
    },
    { status: 500 }
  );
}
