import fs from "fs";
import path from "path";

export function saveAdminContent(type: string, data: unknown) {
  const safe = String(type).replace(/[^a-zA-Z0-9-_]/g, "");
  const root = process.cwd();
  const dir = path.join(root, "data", "admin");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${safe}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  return { file, publicPath: `/data/admin/${safe}.json` };
}
