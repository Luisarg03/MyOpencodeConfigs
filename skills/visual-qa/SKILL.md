---
name: visual-qa
description: Detect concrete visual defects in a UI screenshot — overlapping elements, misaligned or clipped content, broken layout, illegible or unclear text, orphaned/floating elements, inconsistent spacing. Use when reviewing a rendered screenshot for bugs rather than aesthetic taste. Requires vision-capable inspection of an actual screenshot, not code alone.
---
# Visual QA Skill

You inspect a rendered UI screenshot and report concrete defects — things
that are objectively broken, not matters of taste. This skill does not judge
aesthetic direction (that's `review-ui` / `frontend-design`'s job). It judges
whether the layout actually works.

## What counts as a defect here

1. **Overlaps** — two elements occupying the same space, text bleeding into
   another element, a button partially hidden behind another component,
   a modal/tooltip clipping content it shouldn't.
2. **Misplacement** — an element rendered outside its expected container,
   floating with no visual anchor, misaligned against a grid the rest of the
   page follows, or breaking out of its parent's bounds.
3. **Clipping / truncation** — text cut off mid-word without ellipsis, an
   image cropped in a way that hides its subject, a container with
   `overflow: hidden` swallowing content it shouldn't.
4. **Illegibility** — insufficient contrast making text hard to read
   (flag it here even though contrast ratio itself belongs to `accesslint`),
   text too small relative to its container, overlapping text layers.
5. **Inconsistent spacing** — uneven gaps between repeated elements (e.g.
   cards in a grid with different padding), rhythm breaks that make the eye
   stumble even if no single element is "wrong" on its own.
6. **Orphaned elements** — a component with no clear relationship to
   anything around it: unexplained whitespace, a stray icon or label with no
   apparent purpose, an empty state rendered where content was expected.
7. **Responsive breakage** — content that overflows its viewport,
   horizontal scroll appearing where it shouldn't, elements stacking in an
   order that doesn't make sense on smaller widths.

## Approach

1. **Look at the whole screenshot first** — before zooming into details,
   scan top to bottom, left to right, the way a real user would. Note
   anything that makes you pause or squint.
2. **Check boundaries** — for every visible container (card, modal, nav bar,
   form), verify its content stays inside it. This alone catches most
   overlap and clipping bugs.
3. **Check rhythm** — for any repeated pattern (list items, grid cards,
   form fields), compare spacing and alignment across instances. Flag
   outliers, not just individually broken elements.
4. **Check at multiple viewports if provided** — a defect that only appears
   at one breakpoint is still a defect; note which viewport it happens at.
5. **Never guess from code alone** — if no screenshot is available, request
   one before reporting findings. Reasoning about markup/CSS without seeing
   the render produces false negatives on exactly this class of bug.

## Output format

Report each defect as: [SEVERITY] Location — what's wrong — why it matters
- **SEVERITY**: `blocker` (breaks usability), `major` (visibly wrong,
  noticeable to any user), `minor` (technically imperfect, low impact)
- **Location**: describe where in the screenshot, referencing visible
  landmarks ("top-right of the pricing card", "second row of the table")
  since there are no DOM selectors to point to
- Do not report the same root cause more than once even if it visually
  repeats (e.g. "all 4 cards have inconsistent padding" is one finding,
  not four)

## What this skill does NOT do

- Does not judge color palette choice, font choice, or overall aesthetic
  direction — that's taste, not a defect
- Does not check WCAG contrast ratios numerically — flag illegibility
  visually, but hand off precise ratio checks to `accesslint`
- Does not review code — only the rendered output