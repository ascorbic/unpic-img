import { promises as fs } from "node:fs";

import { join } from "node:path";

/**
 * This is because ng-packagr insists on putting the package.json in the dist
 * folder, which plays badly with yarn workspaces. So we move it back to the
 * root and adjust the paths.
 */

const pkgJsonPath = join(process.cwd(), "package.json");
const distPackageJsonPath = join(process.cwd(), "dist", "package.json");
const packageJson = JSON.parse(await fs.readFile(pkgJsonPath, "utf-8"));
const distPackageJson = JSON.parse(
  await fs.readFile(distPackageJsonPath, "utf-8")
);

console.log("Adding root package.json exports");

const exportsKeys = [
  "module",
  "typings",
  "es2020",
  "esm2020",
  "fesm2020",
  "fesm2015",
];

const distify = (val) =>
  val.startsWith("./") ? val.replace("./", "./dist/") : `dist/${val}`;

for (const key of exportsKeys) {
  packageJson[key] = distify(distPackageJson[key]);
}

packageJson.exports = {
  "./package.json": { default: "./package.json" },
};

const exportEntries = Object.fromEntries(
  Object.entries(distPackageJson.exports["."]).map(([k, v]) => [k, distify(v)])
);
packageJson.exports["."] = exportEntries;

await fs.writeFile(pkgJsonPath, JSON.stringify(packageJson, null, 2));

await fs.unlink(distPackageJsonPath);
