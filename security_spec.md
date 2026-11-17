# Dilan Studio Security Specification & Invariants

## 1. Data Invariants
1. **Public Read, Admin-Only Write**: Public visitors on `index.html` may read `siteSettings/public` and list/get `products/*` (containing zero PII), while all `create`, `update`, and `delete` operations require a verified admin identity (`isAdmin()`).
2. **Strict Schema Enforcement**: Every `SiteSettings` and `Product` document must contain only allowlisted keys, valid string lengths, valid category enums (`Seamless Patterns` or `Mylar Bags`), and valid URL patterns for Fiverr links.
3. **Immutable Audit Fields**: `createdAt` and `createdBy` on `products/{productId}` cannot be mutated after creation.
4. **Server Timestamps Only**: `createdAt` and `updatedAt` must equal `request.time`.
5. **Path ID Hardening**: Document IDs (`settingId`, `productId`, `userId`) must match `^[a-zA-Z0-9_-]+$` and be at most 128 characters.

## 2. Adversarial "Dirty Dozen" Payloads
1. Unauthenticated write to `products/p1` -> `PERMISSION_DENIED`.
2. Authenticated non-admin write to `products/p1` -> `PERMISSION_DENIED`.
3. Spoofed admin email with `email_verified: false` -> `PERMISSION_DENIED`.
4. Shadow field injection (`isFeatured: true`) on `products/p1` -> `PERMISSION_DENIED`.
5. Invalid category enum (`category: "Logos"`) on `products/p1` -> `PERMISSION_DENIED`.
6. Empty or oversized `title` (> 140 chars) or `price` (> 24 chars) -> `PERMISSION_DENIED`.
7. Client-forged `createdAt` timestamp not equal to `request.time` -> `PERMISSION_DENIED`.
8. Mutating `createdBy` or `createdAt` during product update -> `PERMISSION_DENIED`.
9. Writing `siteSettings/other` instead of `siteSettings/public` -> `PERMISSION_DENIED`.
10. Non-HTTP(S) `patternsGigUrl` (`javascript:alert(1)`) in `siteSettings/public` -> `PERMISSION_DENIED`.
11. Resource exhaustion ID (> 128 chars or invalid characters) -> `PERMISSION_DENIED`.
12. Self-elevation write to `admins/{uid}` by non-admin -> `PERMISSION_DENIED`.
