/****************************************************************
* admin.ts
*
* Built-in admin-level permission guard (all-powerful).
****************************************************************/
import { Guard } from "../core/Guard";
import { requirePermission } from "../guards/requirePermission";
import { requireRole } from "../guards/requireRole";
import { chain } from "../core/GuardChain";
import { requireOwner } from "../guards/requireOwner";

export const admin: Guard = chain(
  requireOwner(),
  requireRole("Admin"),
  requirePermission("ADMINISTRATOR")
);