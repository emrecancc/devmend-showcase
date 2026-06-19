import { spawnSync } from "child_process";

const tests = [
  "tests/unit/index.ts",
  "tests/integration/api.ts",
];

let allPassed = true;
for (const t of tests) {
  const result = spawnSync(
    process.execPath,
    ["--loader", "ts-node/esm", t],
    { stdio: "inherit", env: { ...process.env, TS_NODE_PROJECT: "tsconfig.json" } },
  );
  if (result.status !== 0) allPassed = false;
}

if (!allPassed) {
  console.error("\n❌ Some tests failed");
  process.exit(1);
}
console.log("\n✅ All test suites passed");
