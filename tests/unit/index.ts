import assert from "assert";
import { validatePasswordStrength } from "../../src/auth/password";
import { calculateAnnualSavings, PLANS, daysUntilRenewal, getTrialEndDate } from "../../src/utils/pricing";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err instanceof Error ? err.message : err}`);
    failed++;
  }
}

console.log("\n=== Unit Tests ===\n");

console.log("Password validation:");
test("rejects too-short password", () => {
  const r = validatePasswordStrength("abc");
  assert.strictEqual(r.valid, false);
  assert.ok(r.errors.length > 0);
});
test("rejects password without uppercase", () => {
  const r = validatePasswordStrength("password123");
  assert.strictEqual(r.valid, false);
});
test("accepts strong password", () => {
  const r = validatePasswordStrength("StrongPass99");
  assert.strictEqual(r.valid, true);
});

console.log("\nPricing:");
test("annual savings on Starter plan = $38", () => {
  const starter = PLANS.find(p => p.id === "starter")!;
  assert.strictEqual(calculateAnnualSavings(starter), 38);
});
test("annual savings on Pro plan = $98", () => {
  const pro = PLANS.find(p => p.id === "pro")!;
  assert.strictEqual(calculateAnnualSavings(pro), 98);
});
test("trial end date 14 days from now", () => {
  const result = getTrialEndDate(new Date("2025-01-01"));
  assert.strictEqual(result, "2025-01-15");
});
test("days until renewal is a number", () => {
  const days = daysUntilRenewal(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  assert.ok(days >= 6 && days <= 8);
});

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) process.exit(1);
