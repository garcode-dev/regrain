import fs from "node:fs";
import path from "node:path";

// Returns "/images/<file>" when that file exists in public/images, otherwise null.
// Lets a photo replace its illustrated placeholder just by dropping the file in with the
// expected name (see README → Photos). Checked at build time, so rebuild after adding files.
export function publicImage(file: string): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", "images", file)) ? `/images/${file}` : null;
}
