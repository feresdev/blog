import { db } from "../utils/db";
import apiResponse from "../utils/apiResponse";
import apiResponseError from "../utils/apiResponseError";
// import { authGuard } from "../lib/auth/authGuard";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // await authGuard(req);

    const result = await db.query("SELECT NOW();");
    return apiResponse(
      { data: result.rows[0].now, error: null, msg: "ok!" },
      { status: 200 }
    );
  } catch (error) {
    return apiResponseError(error);
  }
}
