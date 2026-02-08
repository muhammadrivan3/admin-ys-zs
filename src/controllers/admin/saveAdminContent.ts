import { saveAdminContent as persistAdminContent } from "../../services/admin/fileStore";

export function saveAdminPayload(type: string, data: unknown) {
  if (!type) throw new Error("missing type");
  return persistAdminContent(type, data);
}
