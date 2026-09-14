// Salt for password hashing
export const SALT_ROUNDS = 10;

export const DEFAULT_LOCALE = 'ukr';
export const DEFAULT_CURRENCY = 'UAH';

// The zone dates are rendered in on the server, before the browser takes over.
export const DEFAULT_TIME_ZONE = 'Europe/Kyiv';

// Number of the displayed item on pagination filter
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export const PAGINATION_RANGE = 5;
