export function external(source: string) {
  if (source.includes("public/config.js")) {
    return true;
  }
  return false;
}
