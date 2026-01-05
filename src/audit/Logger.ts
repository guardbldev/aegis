/****************************************************************
* Logger.ts
*
* Standard audit logger.
* Logs critical permission checks as structured events.
****************************************************************/

export interface AuditLogEvent {
  timestamp: string;
  userId: string;
  guildId?: string;
  action: string;
  result: "allowed" | "denied";
  details?: string;
}

export class Logger {
  /**********************************************
  * Hook this to StorageAdapters (or just use console).
  **********************************************/
  log(event: AuditLogEvent) {
    // * Write to whatever logger you want.
    console.log(`[Aegis Audit]`, event);
  }
}