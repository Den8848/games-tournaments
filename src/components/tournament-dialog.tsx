"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

interface TournamentDialogProps {
  title: string;
  children: ReactNode;
  closeHref?: string;
}

export function TournamentDialog({
  title,
  children,
  closeHref,
}: TournamentDialogProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useBodyScrollLock(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    const onClose = () => {
      if (closeHref) {
        router.push(closeHref);
      } else {
        router.back();
      }
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      dialog.close();
    };

    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [closeHref, router]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      className="backdrop:bg-black/40 bg-transparent p-4 m-0 outline-none w-screen h-screen max-w-none max-h-none flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className="w-[min(92vw,720px)] max-h-[calc(100vh-2rem)] overflow-hidden rounded-xl bg-card/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/80 flex flex-col">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-start justify-between gap-4">
          <div className="text-foreground text-2xl sm:text-3xl font-semibold tracking-tight leading-none">
            {title}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close dialog"
            className="cursor-pointer text-muted-foreground hover:text-foreground bg-background/60 hover:bg-background/80 border border-border/60 backdrop-blur"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <div className="flex-1 px-5 pb-5 sm:px-6 sm:pb-6 pt-4 sm:pt-5 overflow-auto">
          {children}
        </div>
      </div>
    </dialog>
  );
}
