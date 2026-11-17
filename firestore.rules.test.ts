/**
 * Security Rules Specification Verification (Dirty Dozen Payloads)
 * Intended for validation with @firebase/rules-unit-testing in CI/emulator environments.
 */
export const DIRTY_DOZEN_CASES = [
  { name: 'Unauthenticated product create', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Non-admin product create', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Unverified admin email spoof', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Shadow field injection on product', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Invalid category enum on product', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Oversized title or price on product', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Client-forged createdAt timestamp', path: 'products/p1', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Immutable createdBy mutation on update', path: 'products/p1', method: 'update', expected: 'PERMISSION_DENIED' },
  { name: 'Arbitrary siteSettings document ID', path: 'siteSettings/hacked', method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Non-HTTP Fiverr URL injection', path: 'siteSettings/public', method: 'update', expected: 'PERMISSION_DENIED' },
  { name: 'Oversized path document ID', path: `products/${'a'.repeat(129)}`, method: 'create', expected: 'PERMISSION_DENIED' },
  { name: 'Self-elevation write to admins collection', path: 'admins/attackerUid', method: 'create', expected: 'PERMISSION_DENIED' },
];
