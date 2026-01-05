/****************************************************************
* Example: Explainable permissions with reason trees
****************************************************************/

import { PermissionChain } from "../src/core/MiddlewareChain";
import { requireRole } from "../src/guards/requireRole";
import { requireNotMuted } from "../src/guards/requireNotMuted";
import { requireChannel } from "../src/guards/requireChannel";
import { formatReasons } from "../src/core/ExplainableResult";

const permissions = new PermissionChain()
  .use(
    requireRole("Moderator"),
    requireNotMuted(),
    requireChannel("mod-chat")
  );

const ctx = {
  member: { roles: { cache: [{ name: "Member" }] } },
  channel: { name: "general", id: "123" }
};

permissions.check(ctx).then(result => {
  if (!result.allowed) {
    // * Build a dev/user-friendly denial tree explanation!
    const output = formatReasons(result.reasons);
    console.log("Denied:\n" + output);
  }
});