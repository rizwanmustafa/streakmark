import { Request } from "express";

export function addUser(req: Request): boolean {
  try {
    return true;
  } catch (err) {
    return false;
  }
}
