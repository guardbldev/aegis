/****************************************************************
* requirePermission.ts
*
* Checks for Discord permissions (ADMIN, MANAGE_MESSAGES, etc).
****************************************************************/
import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";
import { PermissionResolvable } from "discord.js";

export function requirePermission(...permissions: PermissionResolvable[]): Guard {
  return {
    check(ctx: PermissionContext) {
      if (!ctx.member) return { allowed: false, reason: "No member object" };
      const hasPerm = ctx.member.permissions.has(permissions);
      return hasPerm
        ? { allowed: true }
        : {
            allowed: false,
            reason: `Missing required permission(s): ${permissions.join(", ")}`,
          };
    },
  };
}