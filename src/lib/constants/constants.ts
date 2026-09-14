// Salt for password hashing
export const SALT_ROUNDS = 10;

// Numbers and numeric dates are formatted the Ukrainian way
// (1 234,50 and 02.01.2026).
export const FORMAT_LOCALE = 'uk-UA';
// The interface is written in English: <html lang> and dates in words.
export const UI_LOCALE = 'en';
export const DEFAULT_CURRENCY = 'UAH';

// The zone dates are rendered in on the server, before the browser takes over.
export const DEFAULT_TIME_ZONE = 'Europe/Kyiv';

// Number of the displayed item on pagination filter
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export const PAGINATION_RANGE = 5;
