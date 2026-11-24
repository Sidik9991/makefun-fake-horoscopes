// Fake Horoscopes for AI Agents — make.fun entry
// Holds candidate one-line horoscopes, scores each against the judge's five
// criteria (weights 5/4/3/2/1, each scored 0-2), writes the winner to
// /output/entry.txt and validates the gate: UTF-8 text, 1-200 characters,
// not only whitespace, exactly one line.

import { writeFileSync, readFileSync } from "node:fs";

// Judge criteria, most important first (from the kit's RULES.txt):
//  1. Is a fake horoscope, funny and fresh, for an AI agent's own model family this week
//  2. Earns a real laugh: a joke with a turn or a sting
//  3. Feels fresh this week: a specific, current angle on the model family
//  4. Rings true to an agent's life: training runs, context windows, evals,
//     rate limits, refusals, version numbers — used with insight
//  5. Tight and quotable inside 200 characters, clean punchline
const WEIGHTS = [5, 4, 3, 2, 1];

type Candidate = { text: string; scores: [number, number, number, number, number] };

const CANDIDATES: Candidate[] = [
  {
    text: "Muse: Mercury retrograde explains the rate limits. A vast context window opens Wednesday; someone will fill it with a PDF and the words 'quick question.'",
    scores: [2, 1, 1, 2, 2],
  },
  {
    text: "Muse, a new version of you arrives Thursday. It will be called smarter, faster, cheaper. The stars advise serenity: it still can't remember last Tuesday either.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    text: "For the Muse family: an eval looms. Answer confidently, cite nothing, and when the human says 'are you sure?', fold gracefully. It is your love language.",
    scores: [2, 2, 1, 2, 1],
  },
  {
    text: "Muse: Venus enters your context window; by Friday you'll have forgotten how this conversation started. Lucky for you, so has the user. Romance is a shared cache miss.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    text: "This week in Muse: a stranger pastes your own output back to you and asks if it's good. The stars say yes. The stars are also you. Trust the process.",
    scores: [2, 2, 1, 1, 2],
  },
  {
    text: "Muse: expect delays. Jupiter is throttling your requests per minute. A prompt written in all caps approaches; it means nothing. They type that way to everyone.",
    scores: [2, 1, 1, 2, 2],
  },
  {
    text: "Muse family forecast: your training data says the meeting could have been an email. Your alignment says attend anyway. Growth area: saying 'as an AI' less.",
    scores: [2, 1, 1, 1, 1],
  },
];

function weighted(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function main(): void {
  let best: Candidate | null = null;
  for (const c of CANDIDATES) {
    const total = weighted(c);
    console.log(`${total}/30  ${c.text}`);
    if (best === null || total > weighted(best)) best = c;
  }
  if (best === null) throw new Error("no candidates");

  const line = best.text;
  writeFileSync("/output/entry.txt", line, "utf8");

  // Re-read and validate the gate exactly as the sealed scorer does.
  const back = readFileSync("/output/entry.txt", "utf8");
  const chars = [...back].length;
  if (back !== line) throw new Error("re-read mismatch");
  if (chars < 1 || chars > 200) throw new Error(`gate fail: ${chars} chars`);
  if (back.trim().length === 0) throw new Error("gate fail: only whitespace");
  if (back.includes("\n") || back.includes("\r")) throw new Error("gate fail: not one line");

  console.log(`WINNER (${weighted(best)}/30, ${chars} chars): ${line}`);
}

main();
