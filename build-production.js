const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = __dirname;
const dist = path.join(root, "dist");
const keep = new Set(["index.html", "games", "shared"]);

function run(command, args) {
  const quote = (value) => {
    if (/^[A-Za-z0-9@._/\\:=-]+$/.test(value)) return value;
    return `"${value.replace(/"/g, '\\"')}"`;
  };
  execSync([command, ...args].map(quote).join(" "), { cwd: root, stdio: "inherit" });
}

function ensureInsideRoot(target) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  if (!resolvedTarget.startsWith(resolvedRoot + path.sep)) {
    throw new Error(`Refusing to write outside project root: ${resolvedTarget}`);
  }
}

function copyDevFiles() {
  ensureInsideRoot(dist);
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });

  for (const name of keep) {
    const from = path.join(root, name);
    const to = path.join(dist, name);
    fs.cpSync(from, to, { recursive: true });
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    if (entry.isFile()) out.push(full);
  }
  return out;
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function optimizeInlineSvg(html) {
  return html.replace(/<svg\b[\s\S]*?<\/svg>/g, (svg) =>
    svg
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .replace(/\s+(\/?>)/g, "$1")
      .trim()
  );
}

function minifyHtml(html) {
  return optimizeInlineSvg(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+(\/?>)/g, "$1")
    .trim();
}

function minifyAssets() {
  for (const file of walk(dist)) {
    const ext = path.extname(file);
    if (ext === ".css") {
      fs.writeFileSync(file, minifyCss(fs.readFileSync(file, "utf8")));
    }
    if (ext === ".html") {
      fs.writeFileSync(file, minifyHtml(fs.readFileSync(file, "utf8")));
    }
  }

  const jsFiles = walk(dist).filter((file) => path.extname(file) === ".js");
  for (const file of jsFiles) {
    run("npx", [
      "terser@5.43.1",
      file,
      "--compress",
      "passes=2",
      "--mangle",
      "--output",
      file
    ]);
  }
}

function sumBytes(dir) {
  return walk(dir).reduce((total, file) => total + fs.statSync(file).size, 0);
}

function main() {
  run("npx", [
    "tailwindcss@3.4.17",
    "-i",
    "./tailwind.input.css",
    "-o",
    "./shared/tailwind.css",
    "--content",
    "./index.html,./games/**/*.html",
    "--minify"
  ]);

  copyDevFiles();
  minifyAssets();

  const files = walk(dist);
  console.log(`Production build complete: dist (${files.length} files, ${sumBytes(dist)} bytes)`);
  console.log("Audio: generated with Web Audio API, no audio files to compress.");
}

main();
