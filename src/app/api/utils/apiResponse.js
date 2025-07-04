import { NextResponse } from "next/server";

export default function apiResponse(
  { data, error, msg },
  { status }
) {
  return NextResponse.json({ data, error, msg }, { status });
}
