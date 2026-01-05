/****************************************************************
* ExplainableResult.ts
*
* Extended GuardResult that supports reason aggregation "tree".
* Used for admin debug, user feedback, dashboards, logs.
* Also includes formatting helpers to output the reason tree.
****************************************************************/

export interface ExplainableReasonNode {
  where?: string;
  reason: string;
  children?: ExplainableReasonNode[];
}

export interface ExplainableResult {
  allowed: boolean;
  reasons: ExplainableReasonNode[];
}

/**
 * * Builds a user/admin-facing string output from reason tree.
 */
export function formatReasons(tree: ExplainableReasonNode[] | undefined, indent = "- "): string {
  // * User-friendly summary
  if (!tree || tree.length === 0) return "";
  return tree
    .map(
      node => `${indent}${node.reason}${node.children ? "\n" + formatReasons(node.children, "  " + indent) : ""}`
    )
    .join("\n");
}

/**
 * * Converts nested errors to ExplainableResult.
 */
export function guardResultToExplainable(result: any): ExplainableResult {
  if (result.allowed) return { allowed: true, reasons: [] };
  // * Reason tree: flatten as needed
  if ("reasons" in result) {
    return { allowed: false, reasons: result.reasons };
  }
  return {
    allowed: false,
    reasons: [
      { reason: result.reason || "Permission denied" }
    ]
  };
}