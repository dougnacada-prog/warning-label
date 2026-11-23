// Warning Label for Humans: One Line, Big Laugh
// Writes a single-line safety warning label for every human to /output/entry.txt.
// The label is built from three labelled parts so the punch lands in the last
// few words, then checked against the gate (UTF-8, 1-160 chars, one line)
// before anything is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const HEADER = "WARNING:";
const SUBJECT = "This human ships with";
const MISSING = ["no off switch", "no instruction manual"];
const PUNCH = "opinions formed in under five minutes";

const ENTRY = `${HEADER} ${SUBJECT} ${MISSING.join(", ")}, and ${PUNCH}.`;

const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry is ${chars} characters, must be 1-160`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
