/****************************************************************
* Resolver.ts
*
* Registry for custom guard resolvers.
* Lets developers plug in their own permission logic.
****************************************************************/

import { PermissionContext } from "./PermissionContext";
import { Guard, } from "./Guard";
import { GuardResult } from "./Result";

type ResolverFn = (ctx: PermissionContext) => Promise<GuardResult> | GuardResult;

const resolvers: Map<string, ResolverFn> = new Map();

/**
 * * Register a custom permission resolver by name.
 */
export function registerResolver(name: string, fn: ResolverFn): void {
  resolvers.set(name, fn);
}

/**
 * * Look up and execute a custom resolver.
 */
export async function resolve(name: string, ctx: PermissionContext): Promise<GuardResult> {
  const fn = resolvers.get(name);
  if (!fn) {
    return { allowed: false, reason: `No resolver named ${name}` };
  }
  return fn(ctx);
}

/**
 * * Helper to build guards from custom resolvers.
 */
export function createGuard(fn: ResolverFn): Guard {
  return {
    check: fn,
  };
}