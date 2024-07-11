export function parseCommaSeparated(commaSeparated: string) {
  return commaSeparated.split(',').map((address) => address.trim());
}
