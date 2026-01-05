/****************************************************************
* trusted.ts
*
* Preset for trusted/power users.
****************************************************************/
import { Guard } from "../core/Guard";
import { requireRole } from "../guards/requireRole";
import { chain } from "../core/GuardChain";

export const trusted: Guard = chain(
  requireRole("Trusted", "Server Booster")
);