import { db } from "../../../utils/db";
import apiResponse from "../../../utils/apiResponse";
import apiResponseError from "../../../utils/apiResponseError";

export const dynamic = "force-dynamic";

// Obtener blogs de un usuario especifico
export async function GET(req, { params }) {
  try {

    const { username } = await params;

    const result = await db.query(`
      SELECT 
        b.idblog, 
        b.titulo, 
        b.descripcion, 
        b.portada, 
        b.fechacreacion, 
        b.contenido
      FROM blog b  
      JOIN usuario u ON b.id = u.id 
      WHERE u.username = $1 
      `, [username]);

    if (!result.rowCount) {
      return apiResponse(
        { data: null, error: 'Usuario sin blogs', msg: "Usuario sin blogs" },
        { status: 404 }
      );
    }

    return apiResponse(
      { data: result.rows, error: null, msg: "ok!" },
      { status: 200 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}
