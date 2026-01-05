/****************************************************************
* pulsecommand.ts
*
* Integration helper for PulseCommand.
* Wraps guard checks as PulseCommand "permission" plugins.
****************************************************************/
import { Guard } from "../core/Guard";

/**
 * pulseGuard
 * * Wrap aegis guards as PulseCommand middleware
 */
export function pulseGuard(guard: Guard) {
  return async (ctx: any, next: any) => {
    const result = await guard.check(ctx.aegisPermissions ?? ctx);
    if (!result.allowed) throw new Error(result.reason || "Denied by guard");
    return next();
  };
}