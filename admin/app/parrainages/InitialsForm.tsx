"use client";

import { useActionState } from "react";
import { saveInitials, type InitialsState } from "./actions";

const initialState: InitialsState = { error: null, success: null };

export function InitialsForm({ initials }: { initials: string[] }) {
  const [state, formAction, pending] = useActionState(saveInitials, initialState);

  return (
    <form action={formAction} className="panel">
      <h2>Initiales des parrains et marraines</h2>
      <p className="panel-desc">
        Une entrée par ligne, dans l&apos;ordre d&apos;affichage souhaité (ex. « J et ALT », « CD
        »).
      </p>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="notice">{state.success}</p>}
      <div className="field">
        <label htmlFor="initials">Liste</label>
        <textarea
          id="initials"
          name="initials"
          defaultValue={initials.join("\n")}
          rows={Math.max(8, initials.length + 2)}
          spellCheck={false}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer la liste"}
      </button>
    </form>
  );
}
