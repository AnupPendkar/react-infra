import _ from "lodash";
import * as jssha from 'jssha';

export function isNullOrUndef(obj: any) {
  return obj === null || obj === undefined;
}

export function getStr(data: any): string {
  return (data as string)?.toString()?.trim();
}

export function getStrLower(data: any): string {
  return getStr(data)?.toLowerCase();
}

export function strCmp(str1: any, str2: any): boolean {
  return getStrLower(str1) === getStrLower(str2);
}

export function isPropEmpty(val: any): boolean {
  return (
    isNullOrUndef(val) ||
    (typeof val === "number" && val < 0) ||
    (typeof val === "string" && !val?.trim()?.length) ||
    (Array.isArray(val) && !val?.filter(Boolean)?.length) ||
    (typeof val === "boolean" && val !== true && _.isEmpty(val))
  );
}

export function getHashedString(str: string) {
  return new jssha.default("SHA-512", "TEXT").update(str).getHash("HEX");
}
