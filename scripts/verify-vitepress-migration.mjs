import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const mustExist = [
  'docs/.vitepress/config.mts',
  'docs/.vitepress/theme/index.ts',
  'docs/.vitepress/theme/custom.css',
  'docs/index.md',
  'docs/about.md',
];

const failures = [];

for (const relativePath of mustExist) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    failures.push(`Missing ${relativePath}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const dependencies = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

if (!dependencies.vitepress) {
  failures.push('package.json must depend on vitepress');
}

for (const staleDependency of ['astro', '@astrojs/starlight']) {
  if (dependencies[staleDependency]) {
    failures.push(`package.json should not depend on ${staleDependency}`);
  }
}

if (pkg.scripts?.dev !== 'vitepress dev docs') {
  failures.push('npm run dev must start vitepress dev docs');
}

if (pkg.scripts?.build !== 'vitepress build docs') {
  failures.push('npm run build must run vitepress build docs');
}

const docsRoot = path.join(root, 'docs');
if (fs.existsSync(docsRoot)) {
  const files = walk(docsRoot);
  const chapterFiles = files.filter((file) =>
    /[\\/]chapters[\\/]vol\d+[\\/]\d+\.md$/.test(file),
  );
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
  const indexContent = readOptional(path.join(docsRoot, 'index.md'));

  if (chapterFiles.length !== 77) {
    failures.push(`Expected 77 chapter markdown files, found ${chapterFiles.length}`);
  }

  if (mdxFiles.length > 0) {
    failures.push(`Expected no MDX files under docs, found ${mdxFiles.length}`);
  }

  if (indexContent.includes('@astrojs/starlight') || indexContent.includes('<Card')) {
    failures.push('docs/index.md must not use Starlight-only components');
  }
}

if (failures.length > 0) {
  console.error('VitePress migration verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('VitePress migration verification passed.');

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function readOptional(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}
