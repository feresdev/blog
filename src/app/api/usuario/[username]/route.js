import { db } from "../../utils/db";
import apiResponse from "../../utils/apiResponse";
import apiResponseError from "../../utils/apiResponseError";

export const dynamic = "force-dynamic";

// Obtener usuario por username
export async function GET(req, { params }) {
  try {

    const { username } = await params;

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
      WHERE u.username = $1 
      `, [username]);

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
