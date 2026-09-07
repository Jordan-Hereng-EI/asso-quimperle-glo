"use client";

import type { ButtonHTMLAttributes } from "react";

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Question posée avant d'envoyer le formulaire parent. */
  confirm: string;
}

/** Bouton submit qui demande confirmation (suppressions). */
export function ConfirmButton({ confirm, onClick, ...rest }: ConfirmButtonProps) {
  return (
    <button
      type="submit"
      {...rest}
      onClick={(e) => {
        if (!window.confirm(confirm)) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
    />
  );
}
