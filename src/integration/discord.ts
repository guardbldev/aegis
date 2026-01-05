/****************************************************************
* discord.ts
* 
* Discord.js integration helpers.
* Extract PermissionContext from commands, buttons, modals, etc.
****************************************************************/

import { CommandInteraction, ButtonInteraction, Interaction, GuildMember, TextChannel } from "discord.js";
import { PermissionContext } from "../core/PermissionContext";

export function extractContext(interaction: Interaction): PermissionContext {
  let member: GuildMember | null = null;
  let channel: TextChannel | null = null;
  if ("member" in interaction) member = interaction.member as GuildMember;
  if ("channel" in interaction) channel = interaction.channel as TextChannel;
  return {
    user: interaction.user,
    member,
    guild: interaction.guild ?? null,
    channel,
    interaction,
    isOwner: process.env.BOT_OWNERS?.includes(interaction.user?.id),
  };
}