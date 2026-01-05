/****************************************************************
* requireNotMuted.ts
*
* Example of conditional guard: Deny if the user is muted.
****************************************************************/

import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";

export function requireNotMuted(mutedRoleName = "Muted"): Guard {
  return {
    check(ctx: PermissionContext) {
      if (!ctx.member) return { allowed: true }; // No member, can't be muted
      const hasMuted =
        ctx.member.roles.cache.some(
          r => r.name === mutedRoleName || r.id === mutedRoleName
        );
      return hasMuted
        ? { allowed: false, reason: `Muted users can’t run this command` }
        : { allowed: true };
    },
  };
}