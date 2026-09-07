"use client";

import { useActionState } from "react";
import { PhotoPicker, type PickablePhoto } from "@/components/PhotoPicker";
import { ACTION_ZONE_LABELS, type ActionRow, type ActionZone } from "@/lib/types";
import { createActionAction, updateActionAction, type ActionFormState } from "./actions";

const initialState: ActionFormState = { error: null };
const ZONES: ActionZone[] = ["benin", "bretagne"];

interface ActionFormProps {
  action: ActionRow | null;
  photos: PickablePhoto[];
  defaultZone?: ActionZone;
}

export function ActionForm({ action, photos, defaultZone = "benin" }: ActionFormProps) {
  const serverAction = action ? updateActionAction.bind(null, action.id) : createActionAction;
  const [state, formAction, pending] = useActionState(serverAction, initialState);

  return (
    <form action={formAction} className="panel">
      <h2>{action ? "Informations de l'action" : "Nouvelle action"}</h2>
      {state.error && <p className="error">{state.error}</p>}

      <div className="form-grid">
        <div className="field span-2">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            defaultValue={action?.title ?? ""}
            required
            maxLength={160}
            placeholder="Ex. : Forum des associations"
          />
        </div>

        <div className="field">
          <label htmlFor="zone">Zone</label>
          <select id="zone" name="zone" defaultValue={action?.zone ?? defaultZone}>
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {ACTION_ZONE_LABELS[z]}
              </option>
            ))}
          </select>
        </div>

        <div className="field span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={action?.description ?? ""}
            placeholder="Ce que fait l'association, pour qui, comment participer…"
          />
        </div>

        <div className="span-2">
          <PhotoPicker
            name="photo_id"
            photos={photos}
            value={action?.photo_id ?? null}
            label="Photo"
          />
        </div>

        <div className="field">
          <label htmlFor="article_url">Article de presse — lien (optionnel)</label>
          <input
            id="article_url"
            name="article_url"
            type="url"
            defaultValue={action?.article_url ?? ""}
            placeholder="https://…"
          />
        </div>
        <div className="field">
          <label htmlFor="article_source">Article de presse — source (optionnel)</label>
          <input
            id="article_source"
            name="article_source"
            defaultValue={action?.article_source ?? ""}
            maxLength={80}
            placeholder="Ex. : Le Télégramme"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Enregistrement…" : action ? "Enregistrer" : "Créer l'action"}
      </button>
    </form>
  );
}
