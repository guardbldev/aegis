# **Aegis**

> **Composable permissions & guards for Discord bots**
>
> *Enterprise-grade, modular, explainable permissions system for Discord.js*


---

## 💡 What is Aegis?

**Aegis** is a fully modular, composable, and explainable permissions middleware for Discord bots.

- Middleware-style permission guards (*like Express.js*)
- Chainable, reusable, async permission guards
- Permission reason-trees (explain every denial)
- Supports role/user/permission/channel/owner/cooldown logic
- Presets for admin/moderator/trusted/public
- Plug-and-play storage adapters (json, in-memory, mongo)
- Hot reloadable, dynamic permissions from DB or files
- Tracks audit trail of permissions & denials
- Ready for dashboards and admin panels

**Works with:**
- Slash commands
- Prefix commands
- Buttons
- Modals
- Dashboards and plugin systems
- Any Discord.js app or framework

---

## ✨ **Features**

1. **Permission Guards as Middleware**
   - **Express-style**
   - Chainable, async-ready, short-circuiting guards

2. **Multi-Level Permissions**
   - User → Role → Channel → Guild → Global

3. **Custom Permission Resolvers**
   - Register your own logic and compose guards

4. **Universal Command & UI Protection**
   - Apply guards to commands *and* UI/components (buttons, modals, etc.)

5. **Cooldown/Bypass Integration**
   - Only certain users (e.g. mods) can bypass cooldowns/limits

6. **Permission Presets**
   - Built-in: `admin`, `moderator`, `trusted`, `public`

7. **Dynamic Permission Editing**
   - Change permissions at runtime, reload from config/DB

8. **Explainable Permissions**
   - Every denial has a reason *tree* (for devs/Admins/UIs)
   - Debug mode, user-friendly errors, dashboard output

9. **Storage Adapters**
   - In-memory, JSON (file), MongoDB (extensible)

10. **Audit Logging**
    - Track permission changes & denied attempts
    - Optional webhook support

---

## 📦 **Installation**

```bash
npm install aegis
```

---

## 🚀 **Quick Example**

```ts
import { requireRole } from "aegis/guards";

const guard = requireRole("Moderator");

const ctx = /* your permission context object */;

const result = guard.check(ctx);

if (!result.allowed) {
  // Context could be a command interaction or message, etc.
  ctx.reply("Permission denied. Reason: " + result.reason);
}
```

---

## 🧑‍💻 **Middleware Permission ("Express-style")**

Aegis permissions work like Express middleware for Discord:

```ts
import { PermissionChain } from "aegis/core/MiddlewareChain";
import { requireRole } from "aegis/guards";
import { requireNotMuted } from "aegis/guards";
import { cooldownBypass } from "aegis/guards";

command.use(
  requireRole("Mod"),
  requireNotMuted(),
  cooldownBypass()
);

// At command invocation time:
const result = await command.permissions.check(ctx);
if (!result.allowed) {
  // Automatic short-circuit: returns after first denial
  ctx.reply("Denied:\n" + result.reason);
}
```

**Comments:**  
\* Each guard is a sync or async middleware function  
\* Evaluation stops on first denial  
\* Guards can set debug info for dashboards/developers  
\* You can use the same pattern on button/modals/dashboards, etc.

---

## 🛑 **Explainable Permissions ("Access denied" with Reason Trees)**

No more mysterious denials! Aegis outputs a reason tree for every failed check:

```ts
import { PermissionChain } from "aegis/core/MiddlewareChain";
import { requireRole } from "aegis/guards";
import { requireNotMuted } from "aegis/guards";
import { requireChannel } from "aegis/guards";
import { formatReasons } from "aegis/core/ExplainableResult";

const permissions = new PermissionChain()
  .use(
    requireRole("Moderator"),
    requireNotMuted(),
    requireChannel("mod-chat")
  );

// Some example permission context:
const ctx = {
  member: { roles: { cache: [{ name: "Member" }] } },
  channel: { name: "general", id: "123" }
};

const result = await permissions.check(ctx);

// Output reason tree if denied:
if (!result.allowed) {
  ctx.reply("Denied:\n" + formatReasons(result.reasons));
}
```

**Sample output:**
```
Denied:
- Missing role: Moderator
- Muted users can’t run this command
- Command only allowed in channel(s): mod-chat
```

**Comments:**  
\* Every denial has a human-friendly, admin-friendly, or machine-readable reason  
\* Reason-trees can be consumed by UIs/dashboards/logs  
\* Great for debugging, server admin panels, and user feedback

---

## 💡 **Other Usage Examples**

### Simple Role Guard
```ts
import { requireRole } from "aegis/guards";

const guard = requireRole("Admin");
const result = guard.check(ctx);

if (!result.allowed) {
  ctx.reply("You do not have permission.");
}
```

---

### Chaining Guards with `.chain`
```ts
import { chain } from "aegis/core/GuardChain";
import { requireRole } from "aegis/guards";
import { requireChannel } from "aegis/guards";

const guard = chain(
  requireRole("Moderator"),
  requireChannel("staff-chat")
);

guard.check(ctx).then(result => {
  if (!result.allowed) {
    ctx.reply("Denied: " + result.reason);
  }
});
```

---

### Custom Permission Resolver
```ts
import { createGuard } from "aegis/core/Resolver";

// Only boosters or staff can pass
export const requireBoosterOrStaff = createGuard(ctx =>
  ctx.isBooster || ctx.hasRole("Staff")
    ? { allowed: true }
    : { allowed: false, reason: "Must be booster or staff" }
);
```

---

### Using Presets for Command Permissions
```ts
import { presets } from "aegis";

command.permissions = presets.moderator;
```

---

### Cooldown Bypass
```ts
import { cooldownBypass } from "aegis/guards";

// In your permission chain:
command.use(
  requireRole("Moderator"),
  cooldownBypass()
);
// Moderators won't be rate-limited or cooled down
```

---

### UI Component Protection (Button)
```ts
Button()
  .label("Delete")
  .guard(requireRole("Admin"))
  .onClick(() => deleteMessage());
```

---

## 🧩 **Pluggable Storage/Adapters**

Out of the box:

- **MemoryAdapter** (in-memory, for testing/dev)
- **JsonAdapter** (JSON file for configs/logs)
- **MongoAdapter** (production/clustered)

```ts
import { JsonAdapter } from "aegis/storage/JsonAdapter";
const store = new JsonAdapter("permission-config.json");
await store.set("guild:12345", { mod: "123456" });
```

---

## 📝 **Audit Logging / Webhook Logging**

- All denials and permission changes can be logged (to console, JSON, Mongo, or Discord webhook):

```ts
import { Logger, WebhookLogger } from "aegis/audit";

const logger = new Logger(); // or new WebhookLogger(WEBHOOK_URL)
logger.log({
  timestamp: new Date().toISOString(),
  userId: ctx.user.id,
  guildId: ctx.guild?.id,
  action: "command:delete",
  result: "denied",
  details: "Missing role: Moderator"
});
```

---

## 📚 **Docs**

- `/docs/guards.md` — Writing custom guards/middleware
- `/docs/presets.md` — Permission presets usage
- `/docs/storage.md` — Pluggable storage & dynamic editing
- `/docs/debugging.md` — Enable explainable permission traces

---

## 📄 **License**

MIT

---

> ### 🦾 *Aegis* turns permission spaghetti into clean, debug-friendly, cross-feature logic—making permission systems easy to reason about, audit, and extend for any Discord bot or UI.