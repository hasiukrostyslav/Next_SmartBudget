import { expect, it } from 'vitest';

import { getFormattedAmount } from './utils';

it('formats amounts with the Ukrainian grouping and decimal comma', () => {
  // Intl uses a no-break space as the group separator.
  expect(getFormattedAmount(1234567.5).replace(/\s/g, ' ')).toBe(
    '1 234 567,50',
  );
});
