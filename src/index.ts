/****************************************************************
* AEGIS MAIN ENTRYPOINT
****************************************************************/
export * from "./core/Guard";
export * from "./core/GuardChain";
export * from "./core/MiddlewareChain";
export * from "./core/PermissionContext";
export * from "./core/Resolver";
export * from "./core/Result";
export * from "./core/ExplainableResult";

export * as guards from "./guards/requireRole";
export * as guardsPermission from "./guards/requirePermission";
export * as guardsOwner from "./guards/requireOwner";
export * as guardsChannel from "./guards/requireChannel";
export * as guardsCooldownBypass from "./guards/cooldownBypass";
export * as guardsNotMuted from "./guards/requireNotMuted";

export * as presets from "./presets/admin";
export * as presetsModerator from "./presets/moderator";
export * as presetsTrusted from "./presets/trusted";
export * as presetsPublic from "./presets/public";

export * as storage from "./storage/Adapter";
export * as MemoryAdapter from "./storage/MemoryAdapter";
export * as JsonAdapter from "./storage/JsonAdapter";
export * as MongoAdapter from "./storage/MongoAdapter";

export * from "./audit/Logger";
export * from "./audit/WebhookLogger";

export * from "./integration/pulsecommand";
export * from "./integration/discord";