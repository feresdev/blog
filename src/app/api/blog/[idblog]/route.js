import { db } from "../../utils/db";
import apiResponse from "../../utils/apiResponse";
import apiResponseError from "../../utils/apiResponseError";

export const dynamic = "force-dynamic";

// Obtener un blog por su ID
export async function GET(req, { params }) {
  try {

    const { idblog } = await params;

    const result = await db.query(`
      SELECT 
        b.idblog, 
        b.titulo, 
        b.descripcion, 
        b.portada, 
        b.fechacreacion,
        b.contenido,
        p.id AS idusuario,
        u.username AS usernameusuario,
        p.nombre AS nombreusuario,
        p.apellido AS apellidousuario,
        p.sexo AS sexousuario,
        p.telefono AS telefonousuario,
        p.ciudad AS ciudadusuario
      FROM blog b  
      JOIN persona p ON b.id = p.id
      JOIN usuario u ON p.id = u.id
      WHERE b.idblog = $1 
      `, [idblog]);

    if (!result.rowCount) {
      return apiResponse(
        { data: null, error: 'Blog no encontrado', msg: "Blog no encontrado" },
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
