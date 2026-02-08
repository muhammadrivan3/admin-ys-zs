import React from "react";
import AdminTypeView from "../components/AdminTypeView";
import { AdminTypeName } from "../../../controllers/admin/sections";

export default function AdminTypeRoutePage({ typeName }: { typeName: AdminTypeName }) {
  return <AdminTypeView typeName={typeName} />;
}
