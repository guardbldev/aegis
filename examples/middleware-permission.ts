/****************************************************************
* Example: Middleware-style permission chain
* (Express-style command.use(...))
****************************************************************/

import { PermissionChain } from "../src/core/MiddlewareChain";
import { requireRole } from "../src/guards/requireRole";
import { requireNotMuted } from "../src/guards/requireNotMuted";
import { cooldownBypass } from "../src/guards/cooldownBypass";

const permissions = new PermissionChain()
  .use(
    requireRole("Mod"),
    requireNotMuted(),
    cooldownBypass()
  );

const ctx = {
  member: { roles: { cache: [{ name: "User" }] } },
  isOwner: false
};

permissions.check(ctx).then(result => {
  if (!result.allowed) {
    console.log("Denied (middleware):", result);
  } else {
    console.log("Allowed (middleware)");
  }
});