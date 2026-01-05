/****************************************************************
* Example: UI Component Protection (Button)
****************************************************************/

import { requireRole } from "../src/guards/requireRole";

// Hypothetical Button UI handler
function Button() {
  let label;
  let guard;
  return {
    label: (s: string) => (label = s),
    guard: (g: any) => (guard = g),
    onClick: (fn: Function) => {
      /* ... */
      return {
        click: () => {
          if (!guard) return;
          const ctx = { member: { roles: { cache: [{ name: "Admin" }] } } };
          const result = guard.check(ctx);
          if (!result.allowed) {
            console.log("Denied:", result.reason);
          } else {
            fn();
          }
        }
      };
    }
  };
}

// Usage
Button()
  .label("Delete")
  .guard(requireRole("Admin"))
  .onClick(() => console.log("Message deleted"))
  .click();