import { NextResponse } from "next/server";
import { saveAdminPayload } from "../../../../controllers/admin/saveAdminContent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body || {};
    if (!type) return NextResponse.json({ error: "missing type" }, { status: 400 });
    const result = saveAdminPayload(type, data);
    return NextResponse.json({ ok: true, file: result.publicPath });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
