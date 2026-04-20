# Quality Framework — ISO/IEC 25010

This folder contains structured quality evaluations for agent skills, based on the ISO/IEC 25010 software product quality model.

## Why ISO 25010 for AI Skills?

AI-generated skills are software: they have a specification (`SKILL.md`), observable behavior, and real users. Asserting "it works" is not enough — ISO 25010 forces you to ask *how well* it works across dimensions like reliability, security, and maintainability.

This matters especially when AI generates the output, because AI can be fluent but wrong, consistent but incomplete, or helpful but insecure. A structured quality model makes those gaps visible and measurable.

## Structure

```
quality/
├── README.md                         ← this file
├── code-reviewer/
│   └── iso25010-evaluation.md        ← full evaluation for code-reviewer
└── [skill-name]/
    └── iso25010-evaluation.md
```

## ISO 25010 Characteristics Applied to Skills

| # | Characteristic | Core question for a skill |
|---|----------------|---------------------------|
| 1 | **Functional Suitability** | Does the skill achieve what its description claims? |
| 2 | **Performance Efficiency** | Is it efficient in token use, turns, and context window? |
| 3 | **Compatibility** | Does it work alongside other skills and integrate with tools? |
| 4 | **Usability** | Can users invoke it correctly and act on its output? |
| 5 | **Reliability** | Is the output consistent and resilient to edge-case inputs? |
| 6 | **Security** | Does the skill handle sensitive data safely and generate safe fixes? |
| 7 | **Maintainability** | Can the skill be updated as requirements evolve? |
| 8 | **Portability** | Does it adapt to different languages, stacks, and contexts? |

## Scoring Scale

| Score | Label | Meaning |
|-------|-------|---------|
| 5 | Excellent | Consistently meets or exceeds criteria across all test cases |
| 4 | Good | Meets criteria with minor, non-blocking gaps |
| 3 | Adequate | Partially meets criteria; notable gaps that affect usefulness |
| 2 | Poor | Rarely meets criteria; output requires significant correction |
| 1 | Failing | Does not meet the criterion |
| — | N/A | Characteristic does not apply to this skill |

## How to Run an Evaluation

1. Read the skill's `SKILL.md` to understand its stated scope and output format.
2. Work through each characteristic section in the evaluation document.
3. Run the test scenarios by invoking the skill with the given input in your project.
4. Score each sub-characteristic on the 1–5 scale.
5. Record scores and observations in the `## Results` section at the bottom.

## Adding a New Evaluation

1. Create `quality/[skill-name]/iso25010-evaluation.md`
2. Use `quality/code-reviewer/iso25010-evaluation.md` as the reference template
3. Adapt test scenarios to the skill's specific purpose and checklist
4. Cover all 8 characteristics; mark sub-characteristics as `—` if not applicable
5. Open a PR so findings can be reviewed and discussed
