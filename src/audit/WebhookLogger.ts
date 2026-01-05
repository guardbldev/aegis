/****************************************************************
* WebhookLogger.ts
*
* Sends structured logs to Discord webhooks.
****************************************************************/

import fetch from "node-fetch";
import { AuditLogEvent } from "./Logger";

export class WebhookLogger {
  constructor(private webhookUrl: string) {}

  async log(event: AuditLogEvent) {
    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "Aegis Permission Log",
            timestamp: event.timestamp,
            fields: [
              { name: "User", value: event.userId, inline: true },
              { name: "Guild", value: event.guildId ?? "DM", inline: true },
              { name: "Action", value: event.action, inline: true },
              { name: "Result", value: event.result, inline: true },
              { name: "Details", value: event.details ?? "-", inline: false }
            ]
          }
        ]
      })
    });
  }
}