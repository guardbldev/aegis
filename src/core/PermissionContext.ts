/****************************************************************
* PermissionContext.ts
*
* Runtime context for permission checks.
* Abstracts Discord, but works for other platforms too.
****************************************************************/

import { GuildMember, User, Guild, TextChannel } from "discord.js";

/**
 * PermissionContext
 * * Allows checks based on user, roles, channel, command, etc.
 * * Extensible for use in different Discord-based or custom bots.
 */
export interface PermissionContextBase {
  user: User;
  member: GuildMember | null;
  guild: Guild | null;
  channel: TextChannel | null;
  commandName?: string;
  interaction?: any;    // Slash, button, modal, etc
  isOwner?: boolean;
  isBooster?: boolean;
  [k: string]: any;
}

/**
 * * Users can subclass/add properties as needed.
 */
export type PermissionContext = PermissionContextBase;
