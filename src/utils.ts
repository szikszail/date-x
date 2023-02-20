import { RegExpString } from "./types";

export function ucfirst(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}
export function buildArrayRegexp(items: string[]): string {
  return items.map(ucfirst).join('|');
}
export function mg(...regExp: RegExpString[]): RegExpString {
  return `(${regExp.join('|')})`;
}
export function nmg(...regExp: RegExpString[]): RegExpString {
  return `(?:${regExp.join('|')})`;
}