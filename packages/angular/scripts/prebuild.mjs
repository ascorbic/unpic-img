import { promises as fs } from "node:fs";

import { join } from "node:path";

/**
 * This is all because ng-packagr gets upset if the root package.json has
 * exports. So we remove them before building, and then add them back in
 * postbuild.
 */

console.log("Removing root package.json exports");

const pkgJsonPath = join(process.cwd(), "package.json");

const packageJson = JSON.parse(await fs.readFile(pkgJsonPath, "utf-8"));

const exportsKeys = [
  "module",
  "typings",
  "es2020",
  "esm2020",
  "fesm2020",
  "fesm2015",
  "exports",
];

for (const key of exportsKeys) {
  delete packageJson[key];
}

await fs.writeFile(pkgJsonPath, JSON.stringify(packageJson, null, 2));
