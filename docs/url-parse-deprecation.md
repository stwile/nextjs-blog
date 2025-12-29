# url.parse() Deprecation Investigation and Fix

## Background

Node.js 24 introduced a deprecation warning (DEP0169) for the legacy `url.parse()` function, which should be replaced with the WHATWG URL API (`new URL()`).

## Investigation Results

### Issue 1: https-proxy-agent@5.0.1 ✅ FIXED

**Problem:**
- The `@sentry/cli` package depended on `https-proxy-agent@5.0.1`
- This old version uses the deprecated `url.parse()` function
- Dependency chain: `@sentry/nextjs` → `@sentry/bundler-plugin-core@4.6.1` → `@sentry/cli@2.58.2` → `https-proxy-agent@5.0.1`

**Solution:**
Added a pnpm override in `package.json` to force all instances of `https-proxy-agent` to use version 7.0.6:

```json
{
  "pnpm": {
    "overrides": {
      "https-proxy-agent": "^7.0.6"
    }
  }
}
```

**Why v7?**
- `https-proxy-agent@7.x` uses the modern WHATWG URL API (`new URL()`)
- Compatible with Node.js 18+
- Already used by other dependencies (jsdom, vitest) without issues

**Verification:**
```bash
pnpm why https-proxy-agent
# All instances now show v7.0.6
```

### Issue 2: Next.js 15.5.9 ⚠️ UPSTREAM ISSUE

**Problem:**
- Next.js 15.5.9 still uses `url.parse()` internally in multiple files:
  - `dist/server/base-server.js`
  - `dist/server/web/adapter.js`
  - Other server-side routing files

**Status:**
- This is a known upstream issue
- Requires the Next.js team to migrate to WHATWG URL API
- Not fixed in Next.js 15.x stable releases

**Potential Solutions:**
1. Wait for Next.js to release a fix in a future 15.x patch
2. Upgrade to Next.js 16+ when stable (if they've addressed it)
3. Accept the deprecation warning as it doesn't affect functionality

## Testing

To verify the fix, run:

```bash
# Check dependency versions
pnpm why https-proxy-agent

# Run with deprecation tracing (if on Node 24)
NODE_OPTIONS='--trace-deprecation' pnpm build
```

You should see that all `https-proxy-agent` references use v7.0.6. Any remaining `url.parse()` warnings will be from Next.js itself.

## Impact

- ✅ **Fixed**: Deprecation warnings from Sentry/proxy dependencies
- ⚠️ **Remaining**: Next.js internal url.parse() usage (no functional impact)
- ✅ **Build**: No breaking changes, all tests pass
- ✅ **Performance**: No performance impact

## Future Maintenance

1. Monitor Next.js releases for url.parse() fixes
2. When Sentry updates their dependencies (e.g., `@sentry/cli@3.x` uses `undici` instead of https-proxy-agent), the override may potentially be removed
3. Consider upgrading to Next.js 16 when stable

## References

- [Node.js DEP0169 Documentation](https://nodejs.org/api/deprecations.html#DEP0169)
- [https-proxy-agent v7 Release](https://github.com/TooTallNate/proxy-agents/tree/main/packages/https-proxy-agent)
- [WHATWG URL Standard](https://url.spec.whatwg.org/)
