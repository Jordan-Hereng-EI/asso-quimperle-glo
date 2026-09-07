"use client";

import { useActionState } from "react";
import { uploadPhotos, type UploadState } from "./actions";

const initialState: UploadState = { error: null, success: null };

export function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadPhotos, initialState);

  return (
    <form action={formAction} className="panel">
      <h2>Ajouter des photos</h2>
      <p className="panel-desc">
        JPEG, PNG, WebP… Les images sont converties en WebP et réduites à 1600 px max : inutile de
        les retoucher avant. Plusieurs fichiers possibles à la fois.
      </p>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="notice">{state.success}</p>}
      <div className="form-grid">
        <div className="field upload-drop">
          <label htmlFor="files">Images</label>
          <input id="files" name="files" type="file" accept="image/*" multiple required />
        </div>
        <div className="field">
          <label htmlFor="alt">Description (optionnelle)</label>
          <input
            id="alt"
            name="alt"
            type="text"
            placeholder="Ex. : Cantine de Glo Alladacomè"
            maxLength={200}
          />
          <span className="hint">
            Appliquée à toutes les images envoyées ; modifiable ensuite une par une.
          </span>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Envoi et conversion…" : "Envoyer"}
      </button>
    </form>
  );
}
