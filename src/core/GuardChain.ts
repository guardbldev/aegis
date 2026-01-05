/****************************************************************
* GuardChain.ts
* 
* Allow for chaining multiple guards together.
****************************************************************/

import { PermissionContext } from "./PermissionContext";
import { Guard } from "./Guard";
import { GuardResult } from "./Result";

/**
 * * Chains multiple guards together: deny if any guards fail.
 * * Aggregates debug output and the reason for denial.
 */
export class GuardChain implements Guard {
  private guards: Guard[];

  constructor(...guards: Guard[]) {
    this.guards = guards;
  }

  async check(ctx: PermissionContext): Promise<GuardResult> {
    for (const guard of this.guards) {
      const result = await guard.check(ctx);
      if (!result.allowed) {
        return {
          ...result,
          reason: `[GuardChain] ${result.reason || "Denied by guard."}`,
        };
      }
    }
    return { allowed: true };
  }
}

/**
 * Utility function for expressive API.
 */
export function chain(...guards: Guard[]): GuardChain {
  return new GuardChain(...guards);
}