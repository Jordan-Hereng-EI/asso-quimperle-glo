"use client";

import { useActionState } from "react";
import { PhotoPicker, type PickablePhoto } from "@/components/PhotoPicker";
import { PROJECT_STATUS_LABELS, type Project, type ProjectStatus } from "@/lib/types";
import { createProjectAction, updateProjectAction, type ProjectFormState } from "./actions";

const initialState: ProjectFormState = { error: null };
const STATUSES: ProjectStatus[] = ["en_cours", "realise", "a_venir"];

interface ProjectFormProps {
  project: Project | null;
  photos: PickablePhoto[];
}

export function ProjectForm({ project, photos }: ProjectFormProps) {
  const action = project ? updateProjectAction.bind(null, project.id) : createProjectAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="panel">
      <h2>{project ? "Informations du projet" : "Nouveau projet"}</h2>
      {state.error && <p className="error">{state.error}</p>}

      <div className="form-grid">
        <div className="field span-2">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            defaultValue={project?.title ?? ""}
            required
            maxLength={160}
            placeholder="Ex. : Une cantine scolaire pour Glo Alladacomè"
          />
        </div>

        <div className="field">
          <label htmlFor="location">Lieu</label>
          <input
            id="location"
            name="location"
            defaultValue={project?.location ?? ""}
            maxLength={160}
            placeholder="Ex. : Glo Yokpo, commune de Zè (Bénin)"
          />
        </div>

        <div className="field">
          <label htmlFor="status">État</label>
          <select id="status" name="status" defaultValue={project?.status ?? "a_venir"}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {PROJECT_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <span className="hint">
            Le premier projet « En cours » (dans l&apos;ordre de la liste) est mis en avant sur
            l&apos;accueil du site.
          </span>
        </div>

        <div className="field span-2">
          <label htmlFor="summary">Présentation</label>
          <textarea
            id="summary"
            name="summary"
            defaultValue={project?.summary ?? ""}
            placeholder="Quelques phrases pour présenter le projet, son contexte, ce qu'il apporte…"
          />
        </div>

        <div className="span-2">
          <PhotoPicker
            name="cover_photo_id"
            photos={photos}
            value={project?.cover_photo_id ?? null}
            label="Photo principale"
          />
        </div>

        <div className="field">
          <label htmlFor="article_url">Article de presse — lien (optionnel)</label>
          <input
            id="article_url"
            name="article_url"
            type="url"
            defaultValue={project?.article_url ?? ""}
            placeholder="https://…"
          />
        </div>
        <div className="field">
          <label htmlFor="article_source">Article de presse — source (optionnel)</label>
          <input
            id="article_source"
            name="article_source"
            defaultValue={project?.article_source ?? ""}
            maxLength={80}
            placeholder="Ex. : Ouest-France"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Enregistrement…" : project ? "Enregistrer" : "Créer le projet"}
      </button>
    </form>
  );
}
