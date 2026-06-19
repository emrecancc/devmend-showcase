# DevMend Showcase

Realistic SaaS backend project used to demonstrate **DevMend** AI-powered CI auto-fixing.

## What DevMend does

When CI fails on this repo, [DevMend](https://triage-zeta.vercel.app) automatically:
1. Fetches the failure log
2. Diagnoses the root cause (LLM)
3. Generates a surgical fix patch
4. Opens a `hotfix/*` PR with the fix

## Project structure

```
src/
  auth/         JWT + password utilities
  api/          Express route handlers
  utils/        Pricing, logging utilities
tests/
  unit/         Password & pricing logic
  integration/  JWT auth round-trip
```

## CI scenarios in this repo

| Scenario | Category | What breaks |
|----------|----------|-------------|
| dep-drift-1 | dependency_drift | zod removed from package.json but used in code |
| dep-drift-2 | dependency_drift | axios version pinned to non-existent version |
| config-1    | config_mismatch  | tsconfig strict:true breaks implicit any |
| config-2    | config_mismatch  | .npmrc points to wrong private registry |
| config-3    | config_mismatch  | Missing env var causes module resolution failure |
| flaky-1     | flaky_test       | setTimeout race condition in async test |
| flaky-2     | flaky_test       | Date-dependent assertion |
| transient-1 | transient_network | Timeout fetching external health endpoint |
| unknown-1   | unknown          | Obscure native module compile error |
