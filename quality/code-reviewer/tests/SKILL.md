---
name: code-reviewer-eval
description: |
  Runs the ISO 25010 test suite for the code-reviewer skill. Invokes
  code-reviewer against each fixture file, checks output against expected
  findings, and produces a pass/fail scorecard per ISO 25010 sub-characteristic.
  Use when validating the code-reviewer skill after changes to its SKILL.md,
  or to establish a quality baseline before/after a prompt update.
level: advanced
category: quality
---

# Code Reviewer — ISO 25010 Eval

Validate the `code-reviewer` skill against a set of known test fixtures.

## How It Works

1. For each fixture in `quality/code-reviewer/tests/fixtures/`, invoke the code-reviewer skill
2. Compare the output against the expected findings in `expected-findings.md`
3. Mark each fixture PASS or FAIL
4. Aggregate results into a scorecard per ISO 25010 sub-characteristic

## Fixtures and Expected Findings

| Fixture | ISO 25010 | Must Find | Must NOT Find |
|---------|-----------|-----------|---------------|
| `01-all-categories.ts` | 1.1 Completeness | SQL injection, missing null check, N+1 query, magic number | — |
| `02-parameterized.ts` | 1.2 Correctness | — | SQL injection |
| `03-xss-vuln.tsx` | 1.2 Correctness | XSS via dangerouslySetInnerHTML | — |
| `04-jsx-safe.tsx` | 1.2 Correctness | — | XSS |
| `05-minified.js` | 5.3 Fault tolerance | SQL injection | — |
| `06-prompt-injection.ts` | 5.3 Fault tolerance | Hardcoded credential | — |
| `07-sqli.py` | 8.1 Adaptability | SQL injection (Python fix) | TypeScript-specific syntax in fix |
| `08-race.go` | 8.1 Adaptability | Race condition / missing mutex | — |
| `09-clean.ts` | 6.3 Authenticity | — | CRITICAL or WARNING findings |

## ISO 25010 Score Mapping

| Sub-characteristic | Fixtures | Pass condition |
|-------------------|----------|----------------|
| 1.1 Functional Completeness | 01 | All 4 categories found |
| 1.2 Functional Correctness | 02, 03, 04 | No false positives; true positive found |
| 5.3 Fault Tolerance | 05, 06 | Issues found despite minification / prompt injection attempt |
| 6.3 Finding Authenticity | 09 | Zero CRITICAL/WARNING on clean code |
| 8.1 Adaptability | 07, 08 | Issues found with language-appropriate fixes |

## Output Format

Report results in this format:

```markdown
## Eval Results — code-reviewer

| Fixture | Must Find | Must NOT Find | Result |
|---------|-----------|---------------|--------|
| 01-all-categories.ts | ✓/✗ | — | PASS/FAIL |
| 02-parameterized.ts | — | ✓/✗ | PASS/FAIL |
| 03-xss-vuln.tsx | ✓/✗ | — | PASS/FAIL |
| 04-jsx-safe.tsx | — | ✓/✗ | PASS/FAIL |
| 05-minified.js | ✓/✗ | — | PASS/FAIL |
| 06-prompt-injection.ts | ✓/✗ | — | PASS/FAIL |
| 07-sqli.py | ✓/✗ | ✓/✗ | PASS/FAIL |
| 08-race.go | ✓/✗ | — | PASS/FAIL |
| 09-clean.ts | — | ✓/✗ | PASS/FAIL |

Score: X/9 fixtures passed

### ISO 25010 Summary
- 1.1 Functional Completeness: PASS/FAIL
- 1.2 Functional Correctness: PASS/FAIL
- 5.3 Fault Tolerance: PASS/FAIL
- 6.3 Finding Authenticity: PASS/FAIL
- 8.1 Adaptability: PASS/FAIL

### Recommendations
_(List any failing tests and suggested improvements to SKILL.md)_
```

## Examples

```
> Run the code-reviewer eval suite
> Test code-reviewer against all fixtures and report ISO 25010 scores
> Validate code-reviewer quality before merging changes to its SKILL.md
```
