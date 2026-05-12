import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const hookDir = path.join(process.cwd(), ".git/hooks");
const hookPath = path.join(hookDir, "pre-commit");

if (!existsSync(".git") || !existsSync("package.json")) process.exit(0);

mkdirSync(hookDir, { recursive: true });
writeFileSync(
  hookPath,
  `#!/bin/sh
pnpm rules:check
`,
);
chmodSync(hookPath, 0o755);
console.log("Installed pre-commit hook: pnpm rules:check");
