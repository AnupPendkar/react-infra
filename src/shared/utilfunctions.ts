import _ from "lodash";

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

export function isPropEmpty(
  val: Array<any> | string | number | null | undefined
): boolean {
  return (
    isNullOrUndef(val) ||
    (typeof val === "number" && val < 0) ||
    (typeof val === "string" && !val?.trim()?.length) ||
    (Array.isArray(val) && !val?.filter(Boolean)?.length) ||
    (typeof val === "boolean" && val !== true && _.isEmpty(val))
  );
}
