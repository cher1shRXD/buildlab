import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const lineTarget = 150;
const maxReadableLines = 170;
const errors = [];
const ignoredDirs = new Set([".git", ".next", "node_modules", "out", "build"]);
const ignoredFiles = new Set(["pnpm-lock.yaml", "tsconfig.tsbuildinfo", "next-env.d.ts"]);
const checkedExts = new Set([".css", ".json", ".md", ".mjs", ".ts", ".tsx", ".yaml", ".yml"]);
const featureSegments = new Set(["actions", "hooks", "stores", "constants", "ui", "utils"]);
const sharedSegments = new Set(["api", "config", "lib", "types", "ui"]);
const entityFiles = new Set(["types.ts", "apis.ts", "mutations.ts", "queries.ts"]);

function fail(file, message) { errors.push(`${file}: ${message}`); }
function rel(file) { return path.relative(root, file); }
function read(file) { return readFileSync(file, "utf8"); }

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const file = path.join(dir, entry);
    const name = path.basename(file);
    if (ignoredDirs.has(name) || ignoredFiles.has(name)) continue;
    const stat = statSync(file);
    if (stat.isDirectory()) walk(file, files);
    else if (checkedExts.has(path.extname(file))) files.push(file);
  }
  return files;
}

function checkClaudeReferences() {
  const claudePath = path.join(root, "CLAUDE.md");
  if (!existsSync(claudePath)) return fail("CLAUDE.md", "required rule file is missing");
  const refs = [...read(claudePath).matchAll(/@([A-Za-z0-9_./-]+\.md)/g)];
  for (const [, ref] of refs) {
    if (!existsSync(path.join(root, ref))) fail("CLAUDE.md", `broken rule reference @${ref}`);
  }
}

function checkLineLimit(files) {
  for (const file of files) {
    const lineCount = read(file).split(/\r?\n/).length - 1;
    if (lineCount <= maxReadableLines) continue;
    fail(
      rel(file),
      `${lineCount} lines is too large. Split it into readable modules around ${lineTarget} lines; do not compress formatting to pass.`,
    );
  }
}

function checkTailwind(files) {
  const globals = path.join(root, "src/app/globals.css");
  if (!existsSync(globals)) return fail("src/app/globals.css", "Tailwind v4 entry file is missing");
  const css = read(globals);
  if (!css.includes('@import "tailwindcss";')) {
    fail("src/app/globals.css", 'must use Tailwind v4 @import "tailwindcss"');
  }
  for (const file of files.filter((f) => rel(f).startsWith("src/") || /tailwind\.config\.[cm]?[jt]s$/.test(f))) {
    const source = read(file);
    if (/tailwind\.config\.[cm]?[jt]s$/.test(file)) fail(rel(file), "Tailwind config files are forbidden");
    if (/@tailwind\s+(base|components|utilities)/.test(source)) fail(rel(file), "Tailwind v3 @tailwind directives are forbidden");
    if (/(?:bg|text|border|ring|outline|from|via|to)-\[#/.test(source)) fail(rel(file), "reusable colors must be theme tokens, not arbitrary hex utilities");
  }
}

function checkReactCompiler(files) {
  for (const file of files.filter((f) => /\.(ts|tsx)$/.test(f))) {
    const source = read(file);
    if (/\b(useMemo|useCallback)\s*\(/.test(source)) fail(rel(file), "React Compiler forbids manual memo hooks");
    if (/\bReact\.memo\s*\(|\bmemo\s*\(/.test(source)) fail(rel(file), "React Compiler forbids React.memo");
  }
}

function checkAppPages(files) {
  for (const file of files.filter((f) => rel(f).startsWith("src/app/") && path.basename(f) === "page.tsx")) {
    const source = read(file).trimStart();
    if (source.startsWith('"use client"') || source.startsWith("'use client'")) {
      fail(rel(file), "page files must stay Server Components; move interactivity into features/*/ui");
    }
  }
}

function importsOf(source) {
  const re = /(?:import|export)\s+(?:type\s+)?(?:[^'"]*?\s+from\s+)?["'](@\/[^"']+)["']|import\s*\(\s*["'](@\/[^"']+)["']/g;
  const imports = [];
  for (const match of source.matchAll(re)) imports.push(match[1] ?? match[2]);
  return imports;
}

function layerOf(file) {
  const parts = rel(file).split(path.sep);
  if (parts[0] !== "src") return null;
  if (["app", "shared", "entities", "features", "widgets"].includes(parts[1])) return parts[1];
  return null;
}

function checkLayerImports(files) {
  const forbidden = {
    shared: ["@/app", "@/entities", "@/features", "@/widgets"],
    entities: ["@/app", "@/features", "@/widgets"],
    features: ["@/app", "@/widgets"],
    widgets: ["@/app", "@/widgets"],
  };
  for (const file of files.filter((f) => /\.(ts|tsx)$/.test(f))) {
    const layer = layerOf(file);
    for (const spec of importsOf(read(file))) {
      for (const bad of forbidden[layer] ?? []) {
        if (spec.startsWith(bad)) fail(rel(file), `${layer} layer cannot import ${spec}`);
      }
    }
  }
}

function checkSegments() {
  for (const feature of readdirSync(path.join(root, "src/features"))) {
    const base = path.join(root, "src/features", feature);
    if (!statSync(base).isDirectory()) continue;
    for (const segment of readdirSync(base)) {
      const full = path.join(base, segment);
      if (statSync(full).isDirectory() && !featureSegments.has(segment)) {
        fail(rel(full), "feature segment must be actions/hooks/stores/constants/ui/utils");
      }
    }
  }
  for (const segment of readdirSync(path.join(root, "src/shared"))) {
    const full = path.join(root, "src/shared", segment);
    if (statSync(full).isDirectory() && !sharedSegments.has(segment)) {
      fail(rel(full), "shared segment must be api/config/lib/types/ui");
    }
  }
  for (const entity of readdirSync(path.join(root, "src/entities"))) {
    const base = path.join(root, "src/entities", entity);
    if (!statSync(base).isDirectory()) continue;
    for (const entry of readdirSync(base)) {
      const full = path.join(base, entry);
      if (statSync(full).isFile() && !entityFiles.has(entry)) fail(rel(full), "invalid entity file name");
      if (statSync(full).isDirectory() && entry !== "ui") fail(rel(full), "entity directories must be ui only");
    }
  }
}

const files = walk(root);
checkClaudeReferences();
checkLineLimit(files);
checkTailwind(files);
checkReactCompiler(files);
checkAppPages(files);
checkLayerImports(files);
checkSegments();

if (errors.length) {
  console.error(`CLAUDE rule check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("CLAUDE rule check passed.");
