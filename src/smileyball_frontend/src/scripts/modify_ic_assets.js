/* eslint-disable */

import fs from "fs";
import path from "path";

const assetsFilePath = path.join(process.cwd(), "dist/.ic-assets.json5");
if (fs.existsSync(assetsFilePath)) {
  let fileData = fs.readFileSync(assetsFilePath, "utf8");
  const newCSP = `"Content-Security-Policy": "default-src 'self'; script-src 'self'; connect-src *; img-src 'self' data:; style-src * 'unsafe-inline'; style-src-elem * 'unsafe-inline'; font-src *; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests;"`;
  fileData = fileData.replace(/"Content-Security-Policy": ".*?"/, newCSP);
  fs.writeFileSync(assetsFilePath, fileData);
  console.log("Content-Security-Policy zostało nadpisane.");
} else {
  console.error("Plik .ic-assets.json5 nie został znaleziony.");
}
