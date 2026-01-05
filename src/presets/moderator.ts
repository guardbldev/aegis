/****************************************************************
* moderator.ts
*
* Preset for mods: common permissions
****************************************************************/
import { Guard } from "../core/Guard";
import { requireRole } from "../guards/requireRole";
import { requirePermission } from "../guards/requirePermission";
import { chain } from "../core/GuardChain";

export const moderator: Guard = chain(
  requireRole("Moderator", "Mod"),
  requirePermission("MANAGE_MESSAGES", "KICK_MEMBERS")
);