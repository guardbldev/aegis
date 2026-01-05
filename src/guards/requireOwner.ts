/****************************************************************
* requireOwner.ts
* 
* Only allow bot owner(s) to pass.
****************************************************************/
import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";

const BOT_OWNERS = process.env.BOT_OWNERS?.split(",") || [];

export function requireOwner(): Guard {
  return {
    check(ctx: PermissionContext) {
      const userId = ctx.user?.id;
      const isOwner = ctx.isOwner || BOT_OWNERS.includes(userId);
      return isOwner
        ? { allowed: true }
        : { allowed: false, reason: "You must be a bot owner." };
    },
  };
}