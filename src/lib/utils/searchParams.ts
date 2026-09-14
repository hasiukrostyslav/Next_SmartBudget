export type RawSearchParams = Record<string, string | string[] | undefined>;

// The params SearchParamsSchema replaces with a fallback when they are invalid.
const NORMALISED_KEYS = ['limit', 'page', 'sort', 'order'] as const;

type NormalisedParams = Record<
  (typeof NORMALISED_KEYS)[number],
  string | number
>;

// Next's searchParams object as a sorted URLSearchParams, repeated keys kept.
export function toQueryString(raw: RawSearchParams) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(raw)) {
    for (const entry of [value ?? []].flat()) query.append(key, entry);
  }

  query.sort();
  return query;
}

// When the URL holds an invalid limit, page, sort or order (?page=abc,
// ?limit=100000, ?sort=bogus, a repeated key), the page renders the schema's
// fallback. Returns the query the address bar should show instead, or null if
// the URL already matches what is rendered. Params that were absent stay absent.
export function normaliseSearchParams(
  raw: RawSearchParams,
  parsed: NormalisedParams,
): URLSearchParams | null {
  const query = toQueryString(raw);
  let changed = false;

  for (const key of NORMALISED_KEYS) {
    const values = query.getAll(key);
    if (values.length === 0) continue;

    const expected = String(parsed[key]);
    if (values.length > 1 || values[0] !== expected) {
      query.set(key, expected);
      changed = true;
    }
  }

  if (!changed) return null;

  query.sort();
  return query;
}
