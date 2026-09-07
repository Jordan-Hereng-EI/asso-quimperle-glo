"use client";

import { useState } from "react";

export interface PickablePhoto {
  id: number;
  filename: string;
  alt: string;
}

interface PhotoPickerProps {
  name: string;
  photos: PickablePhoto[];
  value: number | null;
  label?: string;
  /** Compact : sélecteur + vignette sur une ligne (éditeurs d'items). */
  compact?: boolean;
}

/**
 * Sélecteur de photo de la photothèque, avec aperçu. Vide = placeholder
 * « photo à venir » côté site.
 */
export function PhotoPicker({ name, photos, value, label, compact = false }: PhotoPickerProps) {
  const [selected, setSelected] = useState<number | null>(value);
  const current = photos.find((p) => p.id === selected) ?? null;

  return (
    <div className={compact ? "photo-picker photo-picker-compact" : "photo-picker"}>
      {label && <label htmlFor={`picker-${name}`}>{label}</label>}
      <div className="photo-picker-row">
        <div className={compact ? "thumb thumb-sm" : "thumb"}>
          {current ? (
            // eslint-disable-next-line @next/next/no-img-element -- fichiers locaux déjà optimisés
            <img src={`/uploads/${current.filename}`} alt={current.alt} />
          ) : (
            <span className="thumb-empty">Aucune photo</span>
          )}
        </div>
        <select
          id={`picker-${name}`}
          name={name}
          value={selected ?? ""}
          onChange={(e) => setSelected(e.target.value === "" ? null : Number(e.target.value))}
        >
          <option value="">— Aucune photo (placeholder) —</option>
          {photos.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} · {p.alt || p.filename}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
