"use client";
import React, { useEffect, useState, useRef } from "react";
import { SchemaField } from "../../../models/admin/schemas/typeSchemas";

function buildDefault(schema: SchemaField): any {
  if (schema.default !== undefined) return schema.default;
  switch (schema.type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "object": {
      const obj: any = {};
      if (schema.fields) {
        Object.entries(schema.fields).forEach(([k, s]) => (obj[k] = buildDefault(s)));
      }
      return obj;
    }
    case "array": {
      return [];
    }
    default:
      return null;
  }
}

function FieldInput({ schema, value, onChange, path, errors }: { schema: SchemaField; value: any; onChange: (v: any) => void; path: string; errors?: Record<string,string[]> }) {
  if (schema.type === "string") {
    const errs = errors?.[path] || [];
    return (
      <div className="admin-field__control">
        <input className="admin-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        {errs.map((m, i) => (
          <div key={i} className="admin-error">{m}</div>
        ))}
      </div>
    );
  }
  if (schema.type === "number") {
    return (
      <div className="admin-field__control">
        <input className="admin-input" type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  }
  if (schema.type === "boolean") {
    return (
      <label className="admin-checkbox">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span>Aktif</span>
      </label>
    );
  }
  if (schema.type === "object") {
    return (
      <div className="admin-object">
        {schema.fields && Object.entries(schema.fields).map(([k, s]) => (
          <div key={k} className="admin-field">
            <label className="admin-label">{k}{s.required ? " *" : ""}</label>
            <FieldInput
              schema={s}
              value={value ? value[k] : undefined}
              onChange={(v) => onChange({ ...(value || {}), [k]: v })}
              path={`${path}.${k}`}
              errors={errors}
            />
          </div>
        ))}
      </div>
    );
  }
  if (schema.type === "array") {
    const items = Array.isArray(value) ? value : [];
    // primitive arrays
    if (!schema.items) return <div>Unknown array</div>;
    if (schema.items.type !== "object") {
      return (
        <div className="admin-array">
          {items.map((it: any, i: number) => (
            <div key={i} className="admin-array__row">
              <FieldInput
                schema={schema.items!}
                value={it}
                onChange={(v) => { const copy = [...items]; copy[i] = v; onChange(copy); }}
                path={`${path}[${i}]`}
                errors={errors}
              />
              <button className="admin-button admin-button--ghost" onClick={() => { const copy = [...items]; copy.splice(i, 1); onChange(copy); }}>Remove</button>
            </div>
          ))}
          <div className="admin-array__actions">
            <button className="admin-button admin-button--primary" onClick={() => onChange([...items, buildDefault(schema.items!)])}>Add</button>
          </div>
        </div>
      );
    }

    // array of objects
    return (
      <div className="admin-array">
        {items.map((it: any, i: number) => (
          <div key={i} className="admin-array__card">
            <div className="admin-array__header">
              <strong>{path}[{i}]</strong>
              <div>
                <button className="admin-button admin-button--ghost" onClick={() => { const copy = [...items]; copy.splice(i, 1); onChange(copy); }}>Remove</button>
              </div>
            </div>
            <FieldInput
              schema={schema.items!}
              value={it}
              onChange={(v) => { const copy = [...items]; copy[i] = v; onChange(copy); }}
              path={`${path}[${i}]`}
              errors={errors}
            />
          </div>
        ))}
        <button className="admin-button admin-button--primary" onClick={() => onChange([...items, buildDefault(schema.items!)])}>Add item</button>
      </div>
    );
  }
  return <div>Unknown field</div>;
}

export default function FormEditor({
  typeName,
  schema,
  onSaved,
  onDirtyChange,
  compact = false,
}: {
  typeName: string;
  schema: SchemaField;
  onSaved?: () => void;
  onDirtyChange?: (dirty: boolean) => void;
  compact?: boolean;
}) {
  const key = `admin:${typeName}`;
  const [data, setData] = useState<any>(() => buildDefault(schema));
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string,string[]>>({});
  const dirtyRef = useRef(false);
  const skipDirtyRef = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setData(JSON.parse(raw));
        skipDirtyRef.current = true;
      }
    } catch (e) {}
  }, [key]);

  useEffect(() => {
    if (skipDirtyRef.current) {
      skipDirtyRef.current = false;
      return;
    }
    if (!dirtyRef.current) {
      dirtyRef.current = true;
      onDirtyChange?.(true);
    }
  }, [data, onDirtyChange]);
  function validate(schema: SchemaField, value: any, path: string, out: Record<string,string[]>) {
    // required
    if (schema.required) {
      const empty = value === undefined || value === null || (typeof value === "string" && value.trim() === "") || (Array.isArray(value) && value.length === 0);
      if (empty) {
        out[path] = out[path] || [];
        out[path].push("Required");
      }
    }
    if (schema.type === "string" && schema.pattern && typeof value === "string" && value) {
      try {
        const re = new RegExp(schema.pattern);
        if (!re.test(value)) {
          out[path] = out[path] || [];
          out[path].push("Invalid format");
        }
      } catch (e) {
        // ignore bad pattern
      }
    }
    if (schema.type === "object" && schema.fields) {
      Object.entries(schema.fields).forEach(([k, s]) => validate(s, value ? value[k] : undefined, `${path}.${k}`, out));
    }
    if (schema.type === "array" && schema.items) {
      const arr = Array.isArray(value) ? value : [];
      if (schema.items.type === "object") {
        arr.forEach((it, i) => validate(schema.items!, it, `${path}[${i}]`, out));
      } else {
        arr.forEach((it, i) => validate(schema.items!, it, `${path}[${i}]`, out));
      }
    }
  }

  async function save() {
    const out: Record<string,string[]> = {};
    validate(schema, data, typeName, out);
    setErrors(out);
    if (Object.keys(out).length > 0) return;

    try {
      // save locally
      localStorage.setItem(key, JSON.stringify(data));
      onSaved?.();
      dirtyRef.current = false;
      onDirtyChange?.(false);
      // try server save
      const res = await fetch('/api/admin/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: typeName, data }) });
      if (!res.ok) throw new Error('server save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (e) {
      // still keep local save, but expose console
      console.error(e);
    }
  }

  function download() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${typeName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={`admin-card admin-card--form ${compact ? "admin-card--compact" : ""}`}>
      <div className="admin-card__header">
        <div className="admin-card__title">
          <span className="admin-chip admin-chip--accent">Form</span>
          <strong>{typeName}</strong>
        </div>
        <div className="admin-card__actions">
          <button className="admin-button admin-button--primary" onClick={save}>Save</button>
          <button className="admin-button" onClick={download}>Download</button>
        </div>
      </div>

      <FieldInput schema={schema} value={data} onChange={setData} path={typeName} errors={errors} />

      <div className="admin-sticky-actions">
        <button className="admin-button admin-button--primary" onClick={save}>Save</button>
        <button className="admin-button" onClick={download}>Download</button>
      </div>
      <div className="admin-card__footer">{saved ? <span className="admin-status admin-status--success">Saved</span> : null}</div>
    </div>
  );
}
