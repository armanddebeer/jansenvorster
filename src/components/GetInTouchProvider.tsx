"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type TGetInTouchContext = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const GetInTouchContext = createContext<TGetInTouchContext | null>(null);

/**
 * Lets header, footer, and other CTAs open the same Get in Touch dialog.
 */
export function GetInTouchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal]
  );

  return (
    <GetInTouchContext.Provider value={value}>{children}</GetInTouchContext.Provider>
  );
}

/**
 * Access the Get in Touch dialog controls. Must sit inside GetInTouchProvider.
 */
export function useGetInTouch() {
  const ctx = useContext(GetInTouchContext);
  if (!ctx) {
    throw new Error("useGetInTouch must be used within GetInTouchProvider");
  }
  return ctx;
}
