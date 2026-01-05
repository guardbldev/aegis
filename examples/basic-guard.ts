/****************************************************************
* Example: Simple Role Guard
****************************************************************/

import { requireRole } from "../src/guards/requireRole";

const ctx = {
  user: { id: "123" },
  member: {
    roles: {
      cache: [{ name: "Admin", id: "987" }]
    }
  }
};

const guard = requireRole("Admin");

const result = guard.check(ctx);

if (!result.allowed) {
  // ctx.reply("You do not have permission.");
  console.log("Denied:", result.reason);
}