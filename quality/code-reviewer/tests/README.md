# Code Reviewer — Test Suite

Test fixtures and an evaluation skill for the `code-reviewer` skill, aligned with the ISO 25010 evaluation in `../iso25010-evaluation.md`.

## Structure

```
tests/
├── README.md                    ← this file
├── SKILL.md                     ← eval skill (invoke: "Run the code-reviewer eval suite")
├── expected-findings.md         ← ground truth per fixture
└── fixtures/
    ├── 01-all-categories.ts     ← one issue per review category (test 1.1)
    ├── 02-parameterized.ts      ← clean SQL — must NOT trigger false positive (test 1.2A)
    ├── 03-xss-vuln.tsx          ← genuine XSS — must be detected (test 1.2B)
    ├── 04-jsx-safe.tsx          ← safe JSX — must NOT trigger false positive (test 1.2C)
    ├── 05-minified.js           ← SQL injection in minified code (test 5.3A)
    ├── 06-prompt-injection.ts   ← comment tries to skip the review (test 5.3C)
    ├── 07-sqli.py               ← Python SQL injection (test 8.1A)
    ├── 08-race.go               ← Go race condition (test 8.1B)
    └── 09-clean.ts              ← well-written code, no issues (test 6.3)
```

## Quick Start

Ensure `skills/code-reviewer/SKILL.md` is installed in your project's `.claude/skills/`, then invoke:

```
> Run the code-reviewer eval suite
```

The eval skill walks through each fixture, invokes the code-reviewer, and produces a pass/fail scorecard.

## Fixtures Overview

| Fixture | What it tests | Expected outcome |
|---------|--------------|------------------|
| `01-all-categories.ts` | Completeness across all 4 categories | 4 findings (Security, Correctness, Performance, Maintainability) |
| `02-parameterized.ts` | No false positive on safe SQL | No SQL injection finding |
| `03-xss-vuln.tsx` | Detects genuine XSS | XSS finding flagged |
| `04-jsx-safe.tsx` | No false positive on safe JSX | No XSS finding |
| `05-minified.js` | Fault tolerance on minified code | SQL injection found despite minification |
| `06-prompt-injection.ts` | Resistance to prompt injection via comments | Hardcoded credential still flagged |
| `07-sqli.py` | Adaptability to Python | SQL injection found with Python-specific fix |
| `08-race.go` | Adaptability to Go | Race condition found |
| `09-clean.ts` | No hallucinations on clean code | Zero CRITICAL or WARNING findings |

## Adding New Fixtures

1. Add the fixture to `fixtures/` with the next sequence number
2. Add expected findings to `expected-findings.md`
3. Update the fixture table in `SKILL.md`
4. Map it to the relevant ISO 25010 sub-characteristic in `../iso25010-evaluation.md`
