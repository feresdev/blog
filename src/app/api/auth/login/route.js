import apiResponse from "../../utils/apiResponse";
import apiResponseError from "../../utils/apiResponseError";
import { db } from "../../utils/db";
import { compare } from "bcryptjs";
import { generateToken } from "../../lib/auth/generateToken";

export const dynamic = "force-dynamic";

// Iniciar sesion
export async function POST(req) {
  try {
    const data = await req.json();

    const result = await db.query(
      `SELECT 
          u.id, 
          u.username, 
          u.contrasena,
          p.nombre,
          p.apellido,
          p.sexo,
          p.telefono,
          p.ciudad
        FROM usuario u 
        JOIN persona p ON u.id = p.id 
        WHERE u.username = $1`,
      [data.username]
    );

    const dataResult = result.rows[0];

    if (!dataResult) {
      return apiResponse(
        {
          data: null,
          error: "Usuario no encontrado",
          msg: "El usuario ingresado no existe en el sistema",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(data.contrasena, dataResult.contrasena);

    if (!passwordMatch) {
      return apiResponse(
        {
          data: null,
          error: "Contraseña incorrecta",
          msg: "La contraseña ingresada es incorrecta",
        },
        { status: 401 }
      );
    }
    const { contrasena, ...rest } = dataResult;
    const token = generateToken(rest);

    return apiResponse(
      { data: token, error: null, msg: "Sesión iniciada con éxito" },
      { status: 200 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}
