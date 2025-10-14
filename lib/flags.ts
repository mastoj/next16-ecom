import { flag } from "flags/next";

export const flagSimulateDelay = flag({
  key: "simulate-delay",
  decide() {
    return true;
  },
});

export const precomputedFlags = [flagSimulateDelay] as const;
