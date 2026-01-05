/****************************************************************
* Guard.ts
* 
* Base abstraction for permission guards.
* Allows composable, middleware-like permission checks.
****************************************************************/

import { PermissionContext } from "./PermissionContext";
import { GuardResult } from "./Result";

/**
 * * The Guard interface allows custom permission guard implementations.
 * * Guards can be chained, reused, and customized.
 */
export interface Guard {
  /**************************************************************
  * Synchronously or asynchronously checks the context.
  * Returns a GuardResult object.
  ***************************************************************/
  check(ctx: PermissionContext): Promise<GuardResult> | GuardResult;
}