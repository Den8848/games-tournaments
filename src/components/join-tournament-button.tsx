"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface JoinTournamentButtonProps {
  tournamentTitle: string;
}

export function JoinTournamentButton({ tournamentTitle }: JoinTournamentButtonProps) {
  const [state, setState] = useState<"idle" | "joining" | "joined">(
    "idle",
  );

  async function join() {
    if (state !== "idle") {
      return;
    }
    setState("joining");

    await new Promise((r) => setTimeout(r, 650));

    setState("joined");
    toast.success(`Joined “${tournamentTitle}”`);
  }

  return (
    <Button
      type="button"
      onClick={join}
      disabled={state !== "idle"}
      className="w-full sm:w-auto"
    >
      {state === "idle"
        ? "Join Tournament"
        : state === "joining"
          ? "Joining..."
          : "Joined"}
    </Button>
  );
}

