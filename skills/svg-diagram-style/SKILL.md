---
name: svg-diagram-style
description: 'svg-diagram-style'
license: MIT
---

# SVG Inline Diagram Style Guide

A reusable visual language for hand-coded SVG diagrams embedded in technical documentation. No external libraries. Flat design. Enterprise-grade clarity.

---

## 1. Philosophy

- **Flat design**: No gradients, no shadows, no 3D effects
- **Semantic color**: Each component type has a consistent color identity
- **Scalable**: Pure SVG with explicit `viewBox`, responsive containers
- **Self-contained**: All styles inline, no external CSS or images
- **Readable at small sizes**: Tested at 630-720px width for PDF output

---

## 2. Canvas & Layout

### Container

```html
<div style="overflow-x:auto;">
  <svg width="680" height="300" viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg"
       style="display:block; max-width:100%; margin:0 auto;">
    <!-- diagram content -->
  </svg>
</div>
```

### Standard Dimensions

| Diagram Type | Width | Height | Use Case |
|--------------|-------|--------|----------|
| **Compact flow** | 630px | 190px | 3-4 sequential steps |
| **Standard flow** | 680px | 260px | 4-5 steps with branches |
| **Architecture** | 680px | 360px | Multi-layer with services |
| **Wide discovery** | 720px | 300px | Multiple sources converging |
| **Tall pipeline** | 630px | 320px | Before/after comparison |

### Spacing Rules
- **Internal padding**: 10px minimum from SVG edge
- **Box spacing**: 16-24px between adjacent boxes
- **Arrow clearance**: 8px from box edge to arrow start
- **Layer spacing**: 40-50px vertical between architecture layers

---

## 3. Color System

### Design Tokens

| Token | Fill | Stroke | Text | Usage |
|-------|------|--------|------|-------|
| `NODE_PRIMARY` | `#EEF3FF` | `#0033A1` | `#0033A1` | Main processes, jobs, core logic |
| `NODE_SUCCESS` | `#E8F8F0` | `#1D8348` | `#1D8348` | Build steps, processing, healthy state |
| `NODE_WARNING` | `#FEF3C7` | `#D97706` | `#D97706` | Storage, artifacts, caches |
| `NODE_ACCENT` | `#EDE9FE` | `#7C3AED` | `#7C3AED` | ML/AI platform, special services |
| `NODE_INFO` | `#E1F5FE` | `#0288D1` | `#0033A1` | Identity, auth, trust boundaries |
| `NODE_DANGER` | `#FCE4EC` | `#C62828` | `#C62828` | Execution roles, cross-account, sensitive |
| `NODE_TRIGGER` | `#FFF3E0` | `#E65100` | `#1A1A1A` | Event sources, triggers, entry points |
| `NODE_DATA` | `#F0FFF4` | `#00BB31` | `#1D8348` | Data sources, models, configurations |

### Neutral Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `ARROW` | `#555` | All connector lines and arrow heads |
| `TEXT_PRIMARY` | `#1A1A1A` | Main labels inside trigger/source boxes |
| `TEXT_SECONDARY` | `#555` | Subtitles, descriptions |
| `TEXT_META` | `#888` | Metadata, counts, repo names |
| `TEXT_CAPTION` | `#888` | Footer captions (italic) |
| `BADGE_BG` | contextual | Arrow labels (light variant of node color) |
| `BADGE_TEXT` | contextual | Arrow label text (dark variant) |

---

## 4. Shapes

### Node Box

```svg
<!-- Standard process node -->
<rect x="10" y="28" width="120" height="50" rx="6"
      fill="#EEF3FF" stroke="#0033A1" stroke-width="2"/>

<!-- Large architecture layer -->
<rect x="40" y="80" width="600" height="60" rx="8"
      fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/>

<!-- Small sub-step -->
<rect x="150" y="110" width="130" height="40" rx="4"
      fill="#E8F8F0" stroke="#1D8348" stroke-width="1.5"/>
```

| Variant | rx | stroke-width | Height | Use |
|---------|----|--------------|--------|-----|
| **Layer** | 8 | 2 | 56-62 | Architecture tiers |
| **Process** | 6 | 2 | 46-50 | Jobs, main steps |
| **Step** | 4 | 1.5 | 38-40 | Sub-steps, parallel tasks |
| **Mini** | 4 | 1 | 30-32 | Inline actions |

### Badge (Arrow Label)

```svg
<rect x="200" y="75" width="80" height="18" rx="4" fill="#E3F2FD"/>
<text x="240" y="88" text-anchor="middle" font-size="10" fill="#0033A1" font-weight="600">HTTP POST</text>
```

### Status Badge

```svg
<!-- NEW indicator -->
<rect x="350" y="170" width="48" height="17" rx="8" fill="#1D8348"/>
<text x="374" y="182" text-anchor="middle" font-size="9" fill="white" font-weight="700">NEW</text>

<!-- DEPRECATED indicator -->
<rect x="350" y="170" width="80" height="17" rx="8" fill="#C62828"/>
<text x="390" y="182" text-anchor="middle" font-size="9" fill="white" font-weight="700">DEPRECATED</text>
```

---

## 5. Typography

### Font

```svg
font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
```

### Hierarchy

| Level | Size | Weight | Color | Style | Usage |
|-------|------|--------|-------|-------|-------|
| **H1** | 14px | 700 | stroke color | normal | Box main title |
| **H2** | 12px | 700 | stroke color | normal | Secondary box title |
| **Body** | 10px | 400 | `#555` | normal | Description, subtitle |
| **Meta** | 9px | 400 | `#888` | normal | Counts, IDs, metadata |
| **Badge** | 10px | 600 | contextual | normal | Arrow labels |
| **Status** | 9px | 700 | `#FFFFFF` | normal | NEW, BETA, etc. |
| **Caption** | 10px | 400 | `#888` | italic | Diagram footer |
| **Corner** | 9px | 700 | `#0033A1` | normal | Section labels (EXISTING, LEGACY) |

### Positioning
- **Centered**: `text-anchor="middle"` for all box labels
- **Vertical center**: `y = box_y + (height / 2) + 4`
- **Multi-line**: Separate `<text>` elements, 15-17px vertical spacing
- **Corner labels**: `x="6" y="14"`, no anchor (left-aligned by default)

---

## 6. Arrows & Connectors

### Arrow Marker Definition

```svg
<defs>
  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
    <polygon points="0 0, 8 3, 0 6" fill="#555"/>
  </marker>
</defs>
```

### Simple Arrow

```svg
<line x1="128" y1="53" x2="148" y2="53"
      stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
```

### Fan-Out (One to Many)

```svg
<!-- Vertical stem -->
<line x1="300" y1="80" x2="300" y2="100" stroke="#555" stroke-width="1.5"/>

<!-- Horizontal trunk -->
<line x1="100" y1="100" x2="500" y2="100" stroke="#555" stroke-width="1.5"/>

<!-- Vertical drops -->
<line x1="100" y1="100" x2="100" y2="120" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
<line x1="300" y1="100" x2="300" y2="120" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
<line x1="500" y1="100" x2="500" y2="120" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
```

### Fan-In (Many to One)

```svg
<line x1="100" y1="80" x2="200" y2="140" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
<line x1="100" y1="150" x2="200" y2="150" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
<line x1="100" y1="220" x2="200" y2="160" stroke="#555" stroke-width="1.5" marker-end="url(#arrowhead)"/>
```

### Bidirectional / Loop

```svg
<path d="M 200 200 C 250 200, 250 150, 200 150" stroke="#555" stroke-width="1.5"
      fill="none" marker-end="url(#arrowhead)"/>
```

---

## 7. Layout Patterns

### Pattern A: Vertical Stack

Top-to-bottom hierarchy with a final fan-out.

```
[Trigger/Source]          <- NODE_TRIGGER
       | protocol-badge
[Identity/Auth]           <- NODE_INFO
       | action-badge
[Execution Role]          <- NODE_DANGER
       |
   +---+---+
[Svc1] [Svc2] [Svc3]  <- mixed NODE_* types
```

**Use for**: Authentication flows, deployment pipelines, request lifecycle.

### Pattern B: Horizontal Pipeline

Left-to-right sequence with optional parallel fan-out.

```
[Step1] -> [Step2] -> [Step3]
                    |
               +----+----+
            [Task1] [Task2] [Task3]
```

**Use for**: CI/CD jobs, data pipelines, sequential processing.

### Pattern C: Discovery / Aggregation

Multiple sources converging into a single process.

```
[Source1] --+
[Source2] --+-> [Processor] -> [Destination]
[Source3] --+
```

**Use for**: Config discovery, multi-tenant aggregation, batch collectors.

### Pattern D: Before / After

Existing flow extended with new capabilities.

```
EXISTING:
[Job1] -> [Job2] -> [Job3] -> [LegacyOutput]
                              |
NEW:                    [NewJob1] -> [NewJob2]
```

**Use for**: Feature additions, migration paths, phased rollouts.

### Pattern E: State Machine

Nodes with bidirectional or self-referencing transitions.

```
         +----------+
         |          |
[State1] -> [State2] -> [State3]
    ^___________|
```

**Use for**: Workflow states, approval processes, retry logic.

---

## 8. Complete Minimal Example

```svg
<svg width="630" height="190" viewBox="0 0 630 190" xmlns="http://www.w3.org/2000/svg"
     style="display:block; max-width:100%; margin:0 auto;">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#555"/>
    </marker>
  </defs>

  <!-- Step 1 -->
  <rect x="10" y="28" width="120" height="50" rx="6"
        fill="#EEF3FF" stroke="#0033A1" stroke-width="2"/>
  <text x="70" y="50" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="12" font-weight="700" fill="#0033A1">ReadConfig</text>
  <text x="70" y="67" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="10" fill="#555">Load YAML</text>

  <!-- Arrow -->
  <line x1="130" y1="53" x2="150" y2="53"
        stroke="#555" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Protocol badge -->
  <rect x="156" y="44" width="50" height="18" rx="4" fill="#E3F2FD"/>
  <text x="181" y="57" text-anchor="middle" font-size="10"
        fill="#0033A1" font-weight="600">JSON</text>

  <!-- Step 2 -->
  <rect x="210" y="28" width="120" height="50" rx="6"
        fill="#E8F8F0" stroke="#1D8348" stroke-width="2"/>
  <text x="270" y="50" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="12" font-weight="700" fill="#1D8348">Validate</text>
  <text x="270" y="67" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="10" fill="#555">Check files</text>

  <!-- Arrow -->
  <line x1="330" y1="53" x2="350" y2="53"
        stroke="#555" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Step 3 -->
  <rect x="360" y="28" width="120" height="50" rx="6"
        fill="#E8F8F0" stroke="#1D8348" stroke-width="2"/>
  <text x="420" y="48" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="12" font-weight="700" fill="#1D8348">Build</text>
  <text x="420" y="65" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="10" fill="#555">matrix x N</text>

  <!-- Caption -->
  <text x="315" y="175" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="10" fill="#888" font-style="italic">Pipeline flow example</text>
</svg>
```

---

## 9. Rules & Constraints

1. **No gradients** - flat fills only
2. **No shadows** - clean flat design
3. **No external images** - pure SVG shapes and text
4. **Consistent spacing** - 10-20px between boxes, 8px arrow clearance
5. **Centered text** - always `text-anchor="middle"`
6. **Color consistency** - same component type = same colors across all diagrams
7. **Badge contrast** - arrow badges use light fill with dark text (or inverse for status)
8. **Caption placement** - bottom center, italic, `#888`
9. **Marker reuse** - define once in `<defs>`, reference by ID
10. **Responsive** - `max-width:100%` on container, explicit viewBox

---

## 10. Color Quick Reference

```
NODE_PRIMARY:     #EEF3FF / #0033A1
NODE_SUCCESS:     #E8F8F0 / #1D8348
NODE_WARNING:     #FEF3C7 / #D97706
NODE_ACCENT:      #EDE9FE / #7C3AED
NODE_INFO:        #E1F5FE / #0288D1
NODE_DANGER:      #FCE4EC / #C62828
NODE_TRIGGER:     #FFF3E0 / #E65100
NODE_DATA:        #F0FFF4 / #00BB31
ARROW:            #555
TEXT_SECONDARY:   #555
TEXT_META:        #888
TEXT_CAPTION:     #888
```

---

## 11. Pattern Decision Matrix

| Pattern | Direction | Nodes | Use Case |
|---------|-----------|-------|----------|
| **Vertical Stack** | Top-down | 4-7 | Auth flows, deployment |
| **Horizontal Pipeline** | Left-right | 3-6 | CI/CD, data pipelines |
| **Discovery** | Convergent | 4-8 | Config discovery, aggregation |
| **Before/After** | Extension | 5-8 | Feature adds, migrations |
| **State Machine** | Cyclic | 3-5 | Workflows, approvals |
