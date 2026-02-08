import AdminTypeRoutePage from "../../../views/admin/pages/TypePage";
import { AdminTypeName } from "../../../controllers/admin/sections";

export default function AdminTypePage({ params }: { params: { type: string } }) {
  return <AdminTypeRoutePage typeName={params.type as AdminTypeName} />;
}
