import { db } from "../utils/db";
import apiResponse from "../utils/apiResponse";
import apiResponseError from "../utils/apiResponseError";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/auth/generateToken";
import { authGuard } from "../lib/auth/authGuard";

export const dynamic = "force-dynamic";

// Crear usuario
export async function POST(req) {
  try {

    const data = await req.json();
    // Encriptacion de contrasena
    const hashedContrasena = await bcrypt.hash(data.contrasena, 10);

    const result = await db.query("SELECT fn_crear_persona($1, $2, $3, $4, $5, $6, $7)", [
      data.username,
      hashedContrasena,
      data.nombre,
      data.apellido,
      data.sexo,
      data.telefono,
      data.ciudad,
    ]);

    console.log(result.rows)

    const { contrasena, ...rest } = data;
    const id = result.rows[0].fn_crear_persona;
    const dataResult = { id, ...rest };
    const token = generateToken(dataResult);

    return apiResponse(
      { data: token, error: null, msg: "Usuario creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}

// Obtener usuario autenticado
export async function GET(req) {
  try {

    const playload = await authGuard(req);
    const result = await db.query(`
      SELECT 
        p.id, 
        u.username, 
        p.nombre, 
        p.apellido, 
        p.sexo, 
        p.telefono, 
        p.ciudad 
      FROM persona p  
      JOIN usuario u ON p.id = u.id 
      WHERE u.id = $1 
      `, [playload.id]);

    if (!result.rowCount) {
      return apiResponse(
        { data: null, error: 'Usuario no encontrado', msg: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return apiResponse(
      { data: result.rows[0], error: null, msg: "ok!" },
      { status: 200 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}
