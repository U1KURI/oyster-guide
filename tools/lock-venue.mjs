// Encrypt venue info with a passphrase for assets/presets.js.
// The passphrase is read from the OYSTER_PASS environment variable and is never written anywhere.
//
//   OYSTER_PASS='合言葉' node tools/lock-venue.mjs '{"name":"…","area":"…","map":"https://…"}'
//
// Paste the printed object into VENUES as:  key: { locked: { … } }
import { webcrypto as crypto } from "node:crypto";

const pass = process.env.OYSTER_PASS;
const json = process.argv[2];
if (!pass || !json) {
  console.error("usage: OYSTER_PASS='…' node tools/lock-venue.mjs '{\"name\":\"…\",\"area\":\"…\",\"map\":\"…\"}'");
  process.exit(1);
}
JSON.parse(json); // validate

const ITER = 300000; // must match assets/venue.js expectations (stored alongside, so can change)
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" },
  base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(json)));
const b64 = (u) => Buffer.from(u).toString("base64");
console.log(JSON.stringify({ iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }, null, 2));
