import { db } from "../utils/db";
import apiResponse from "../utils/apiResponse";
import apiResponseError from "../utils/apiResponseError";
import { authGuard } from "../lib/auth/authGuard";

export const dynamic = "force-dynamic";

// Crear blog
export async function POST(req) {
  try {

    const playload = await authGuard(req);

    const data = await req.json();

    await db.query("CALL pa_crear_blog($1, $2, $3, $4, $5)", [
      playload.id,
      data.titulo,
      data.descripcion,
      data.portada,
      data.contenido,
    ]);

    return apiResponse(
      { data: null, error: null, msg: "Blog creado" },
      { status: 201 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}

// Obtener todos los blogs
export async function GET(req) {
  try {

    const result = await db.query(`
      SELECT 
        b.idblog, 
        b.titulo, 
        b.descripcion, 
        b.portada, 
        b.fechacreacion,
        u.username AS usernameusuario,
        p.id AS idusuario,
        p.nombre AS nombreusuario,
        p.apellido AS apellidousuario
      FROM blog b  
      JOIN persona p ON b.id = p.id
      JOIN usuario u ON p.id = u.id
      ORDER BY (fechacreacion) DESC; 
      `,);

    if (!result.rowCount) {
      return apiResponse(
        { data: null, error: 'Sin blogs', msg: "Sin blogs" },
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
