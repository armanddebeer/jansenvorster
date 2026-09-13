"use client";

import { useGetInTouch } from "@/components/GetInTouchProvider";

type TGetInTouchButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onOpen?: () => void;
};

/**
 * Opens the Get in Touch dialog instead of navigating away.
 */
export function GetInTouchButton({
  className,
  children = "Get in touch",
  onOpen,
}: TGetInTouchButtonProps) {
  const { openModal } = useGetInTouch();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        openModal();
      }}
    >
      {children}
    </button>
  );
}
