"use client";

import type { ReactNode } from "react";
import { useSignup } from "@/components/SignupProvider";

interface SignupButtonProps {
  className?: string;
  children: ReactNode;
  /** Runs before the modal opens — e.g. to close the mobile drawer. */
  onBeforeOpen?: () => void;
}

/**
 * Drop-in replacement for the original `[data-signup]` triggers — any of these
 * buttons opens the global sign-up modal provided by <SignupProvider>.
 */
export default function SignupButton({
  className,
  children,
  onBeforeOpen,
}: SignupButtonProps) {
  const { open } = useSignup();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
    >
      {children}
    </button>
  );
}
