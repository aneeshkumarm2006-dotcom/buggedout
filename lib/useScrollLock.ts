import { useEffect } from "react";

// A single shared counter coordinates body-scroll locking across every overlay
// (sign-up modal, mobile drawer, gallery lightbox). Without it, closing one
// overlay while another is still open would unlock scrolling prematurely.
let lockCount = 0;
let savedOverflow = "";

function lock() {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
  }
}

/** Locks body scroll while `active` is true, coordinated across all callers. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}
