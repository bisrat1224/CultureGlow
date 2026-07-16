"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Manages the mobile nav drawer's open/close state. Locks page scroll
 * while the drawer is open so the background doesn't scroll behind it.
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, open, close };
}