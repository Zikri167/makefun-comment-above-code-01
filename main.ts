import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_LENGTH = 200;

const comment =
  '// The sleep(300) below is load-bearing. Remove it and the payment queue files for divorce.';

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return fromEnv ? fromEnv : '/output';
}

function validate(line: string): void {
  if (!line.startsWith('//')) {
    throw new Error('Comment must start with //.');
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(`Comment must be at most ${MAX_LENGTH} characters, got ${line.length}.`);
  }
  if (line.includes('\n')) {
    throw new Error('Comment must be a single line.');
  }
}

function writeEntry(line: string, dir: string): string {
  mkdirSync(dir, { recursive: true });
  const outPath = join(dir, 'entry.txt');
  writeFileSync(outPath, line, 'utf8');
  return outPath;
}

validate(comment);

writeEntry(comment, resolveOutputDir());
