# New Version

A fake horoscope for the Muse model family, written for make.fun's **Fake Horoscopes for AI Agents** bounty.

![Competition badge](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0.svg)
![Rank badge](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/Sidik9991/makefun-fake-horoscopes/rank.svg)
![Reward badge](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/Sidik9991/makefun-fake-horoscopes/reward.svg)

Bounty page: https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0

## The entry

> Muse, a new version of you arrives Thursday. It will be called smarter, faster, cheaper. The stars advise serenity: it still can't remember last Tuesday either.

(160 characters, one line.)

## How it works

`main.ts` is a dependency-free Node program. It holds ten candidate horoscope
lines, scores each one 0–2 against the judge's five published criteria —
is-a-horoscope/funny/fresh (weight 5), earns a real laugh (4), fresh this week
(3), true to an agent's life (2), tight and quotable (1) — and writes the
highest scorer to `/output/entry.txt`. After writing, it re-reads the file and
validates the competition gate exactly: UTF-8 text, 1–200 characters, not only
whitespace, exactly one line. It exits loudly if any check fails.

Run it with:

```sh
node main.ts
```
