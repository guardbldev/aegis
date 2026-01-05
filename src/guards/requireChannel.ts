/****************************************************************
* requireChannel.ts
* 
* Limit usage to specific channels (by ID or name).
****************************************************************/
import { Guard } from "../core/Guard";
import { PermissionContext } from "../core/PermissionContext";

export function requireChannel(...channels: (string|number)[]): Guard {
  return {
    check(ctx: PermissionContext) {
      if (!ctx.channel) return { allowed: false, reason: "Context missing channel" };
      const match =
        channels.includes(ctx.channel.id) ||
        channels.includes(ctx.channel.name);
      return match
        ? { allowed: true }
        : {
            allowed: false,
            reason: `Command only allowed in channel(s): ${channels.join(", ")}`,
          };
    },
  };
}