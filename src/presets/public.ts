/****************************************************************
* public.ts
*
* All users, no restriction. Use for "public" commands.
****************************************************************/
import { Guard } from "../core/Guard";

export const publicGuard: Guard = {
  check: () => ({ allowed: true })
};