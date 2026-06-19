import assert from "assert";
import { signToken, verifyToken } from "../../src/auth/jwt";

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

console.log("\n=== Integration Tests ===\n");

console.log("JWT Auth:");
test("sign and verify token round-trip", () => {
  const token = signToken({ userId: "u1", email: "test@example.com", role: "user" });
  const payload = verifyToken(token);
  assert.strictEqual(payload.userId, "u1");
  assert.strictEqual(payload.email, "test@example.com");
});
test("invalid token throws", () => {
  assert.throws(() => verifyToken("bad.token.here"));
});

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) process.exit(1);
