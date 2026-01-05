/****************************************************************
* Example: Chain Multiple Guards
****************************************************************/

import { chain } from "../src/core/GuardChain";
import { requireRole } from "../src/guards/requireRole";
import { requireChannel } from "../src/guards/requireChannel";

const ctx = {
  member: { roles: { cache: [{ name: "Moderator" }] } },
  channel: { name: "staff-chat", id: "1234" },
};

const guard = chain(
  requireRole("Moderator"),
  requireChannel("staff-chat")
);

guard.check(ctx).then(result => {
  if (!result.allowed) {
    console.log("Denied: ", result.reason);
  }
});