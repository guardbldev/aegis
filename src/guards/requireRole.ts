/****************************************************************
* requireRole.ts
* 
* Checks if user has the required Discord role(s).
****************************************************************/
import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";

export function requireRole(...roles: string[]): Guard {
  return {
    check(ctx: PermissionContext) {
      if (!ctx.member) return { allowed: false, reason: "No member object" };
      const hasRole = ctx.member.roles.cache.some(r =>
        roles.includes(r.name) || roles.includes(r.id)
      );
      return hasRole
        ? { allowed: true }
        : {
            allowed: false,
            reason: `Missing required role: ${roles.join(", ")}`,
          };
    },
  };
}