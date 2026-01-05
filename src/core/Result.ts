/****************************************************************
* Result.ts
* 
* Describe the result of guard checks.
* Always structured for debugging and UI.
****************************************************************/

/**
 * GuardResult
 * * allowed: boolean -- was access granted?
 * * reason: string? -- debug output for logging/UI
 */
export interface GuardResult {
  allowed: boolean;
  reason?: string;
  [meta: string]: any;
}

/**
 * * Utility: Call after .check() to throw if denied.
 */
export function throwIfDenied(result: GuardResult): void {
  if (!result.allowed) {
    throw new Error(result.reason || "Permission denied");
  }
}