/****************************************************************
* cooldownBypass.ts
* 
* Bypasses command cooldown for privileged users/roles.
****************************************************************/

import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";

export function cooldownBypass(): Guard {
  return {
    check(ctx: PermissionContext) {
      // * Bypass if Admin, Owner, or has custom bypass property
      if (
        ctx.isOwner ||
        ctx.member?.permissions.has("ADMINISTRATOR") ||
        ctx.bypassCooldown === true
      ) {
        // set context to allow bypass
        return { allowed: true, bypassCooldown: true };
      }
      return { allowed: true };
    },
  };
}