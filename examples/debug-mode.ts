/****************************************************************
* Example: Debug Mode (Why Was I Denied?)
****************************************************************/

import { requireRole } from "../src/guards/requireRole";

const guard = requireRole("Owner");

const ctx = {
  user: { id: "12345" },
  member: { roles: { cache: [{ name: "Member" }] } }
};

const result = guard.check(ctx);

if (!result.allowed) {
  // ctx.reply({ content: "Permission denied", debug: result.reason });
  console.log("Permission denied:", result.reason);
}