/****************************************************************
* MiddlewareChain.ts
*
* Express-style permission middleware engine for AegisPerms.
* Advanced: Async, sync, short-circuiting, conditional support,
*  full explainable reason trees.
****************************************************************/

import { PermissionContext } from "./PermissionContext";
import { GuardResult } from "./Result";
import { Guard } from "./Guard";

export type GuardMiddleware = (ctx: PermissionContext, next: () => Promise<GuardResult>) => Promise<GuardResult>;

/**
 * * Wrap a Guard as middleware (bridging legacy and new patterns)
 */
export function guardAsMiddleware(guard: Guard): GuardMiddleware {
  return async (ctx, next) => {
    const result = await guard.check(ctx);
    if (result.allowed) return next();
    // Attach guard result as reason node
    return {
      ...result,
      allowed: false,
      reasons: [
        ...(result.reasons || []),
        { where: guard.constructor.name, reason: result.reason }
      ]
    };
  };
}

/**
 * * Compose guard middleware: supports async, short-circuit, error propagation, explainable result tree
 */
export function composeMiddleware(...middleware: GuardMiddleware[]): GuardMiddleware {
  return async function composed(ctx, next) {
    let idx = -1;
    async function dispatch(i: number): Promise<GuardResult> {
      if (i <= idx) throw new Error("* multiple next() calls");
      idx = i;
      const mw = middleware[i];
      if (!mw) return next(); // Exited end of chain
      return await mw(ctx, () => dispatch(i + 1));
    }
    return dispatch(0);
  };
}

/**
 * * Helper: build an express-like "use" chain for commands, UI, etc
 *
 * USAGE:
 *    command.use(
 *      requireRole("Mod"),
 *      requireNotMuted(),
 *      requireCooldownBypass()
 *    );
 */
export class PermissionChain {
  private middleware: GuardMiddleware[] = [];

  use(...guards: (Guard | GuardMiddleware)[]) {
    for (const g of guards) {
      if ("check" in g) {
        this.middleware.push(guardAsMiddleware(g as Guard));
      } else {
        this.middleware.push(g as GuardMiddleware);
      }
    }
    return this;
  }

  async check(ctx: PermissionContext): Promise<GuardResult> {
    const composed = composeMiddleware(...this.middleware);
    return await composed(ctx, async () => ({ allowed: true, reasons: [] }));
  }
}