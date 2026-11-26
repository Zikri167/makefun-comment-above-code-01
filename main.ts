import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The sleep(300) below is load-bearing. Remove it and the payment queue files for divorce.
const comment = "// The sleep(300) below is load-bearing. Remove it and the payment queue files for divorce.";

if (comment.length === 0 || comment.length > 200) {
  throw new Error('Comment must be between 1 and 200 characters.');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, 'entry.txt');
writeFileSync(outPath, comment);
