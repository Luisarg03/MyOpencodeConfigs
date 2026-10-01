---
name: doc-style-guide
description: 'technical documentation style guide'
license: MIT
---


# Technical Documentation Style Guide

A complete design system for single-file HTML technical documentation. Optimized for both web viewing and PDF generation. Professional, clean, enterprise-grade.

---

## 1. Philosophy

- **Single file**: All CSS embedded in `<style>`, no external dependencies
- **PDF-ready**: Print styles with headers, footers, page breaks, and orphans/widows control
- **Semantic structure**: Cover page, TOC, numbered sections, callouts, code blocks
- **Readable**: 14px base font, 1.6 line-height, 900px max-width centered
- **Professional**: Flat design, consistent spacing, clear hierarchy

---

## 2. CSS Custom Properties (Design Tokens)

```css
:root {
  /* Primary palette */
  --primary: #0033A1;           /* Headings, borders, links */
  --primary-dark: #001D6E;      /* Code backgrounds, dark accents */
  --accent: #00BB31;            /* Section underlines, success states */
  
  /* Text */
  --text: #16191F;              /* Body text */
  --text-secondary: #545B64;    /* Subtitles, metadata */
  
  /* Surfaces */
  --bg: #FFFFFF;                /* Page background */
  --bg-light: #FAFAFA;          /* Alternate table rows, diagram bg */
  --border: #D5DBDB;            /* Table borders, dividers */
  
  /* Code */
  --code-bg: #001D6E;           /* Dark code blocks */
  --code-inline-bg: #F2F3F3;    /* Inline code background */
  --code-inline-text: #D14;      /* Inline code text (red) */
  
  /* Table */
  --table-header: #F2F3F3;      /* Table header background */
  
  /* Callouts */
  --note-bg: #EBF5FB;
  --note-border: #0033A1;
  --warning-bg: #FEF5E7;
  --warning-border: #00BB31;
  --important-bg: #FEF9E7;
  --important-border: #0033A1;
}
```

---

## 3. Document Structure

### HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document Title</title>
<style>
  /* All CSS here */
</style>
</head>
<body>

  <!-- Optional: Top accent bar -->
  <div class="top-bar"></div>
  
  <!-- Optional: Header bar -->
  <div class="header-bar">
    <div class="logo">Company <span>Platform</span></div>
    <div class="doc-title">Document Title</div>
  </div>

  <!-- Cover Page -->
  <div class="cover-area">
    <div class="cover-top-bar"></div>
    <div class="cover-brand">
      <span class="brand-logo">Company</span>
      <span class="brand-sep">|</span>
      <span class="brand-dept">Department Name</span>
    </div>
    <h1>Document Title</h1>
    <div class="subtitle">Subtitle · Keywords · Scope</div>
    <dl class="cover-meta-box">
      <div class="meta-item"><dt>Repository</dt><dd>repo-name</dd></div>
      <div class="meta-item"><dt>Platform</dt><dd>Tech Stack</dd></div>
      <div class="meta-item"><dt>Version</dt><dd>1.0</dd></div>
      <div class="meta-item"><dt>Date</dt><dd>2026-06-22</dd></div>
    </dl>
  </div>

  <!-- Table of Contents -->
  <div class="toc">
    <h2 style="border: none; margin-top: 0;">Table of Contents</h2>
    <ul>
      <li><a href="#section1">1. Section Name</a></li>
      <li><a href="#section2">2. Another Section</a>
        <ul>
          <li><a href="#s21">2.1 Subsection</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- Sections -->
  <section id="section1">
    <h2>1. Section Name</h2>
    <p>Content...</p>
  </section>

</body>
</html>
```

---

## 4. Typography

### Font Stack

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 60px;
}
```

### Heading Hierarchy

| Level | Size | Weight | Decoration | Margin Top |
|-------|------|--------|------------|------------|
| **h1** (cover) | 36px | 700 | none | 0 |
| **h1** (body) | 28px | 700 | none | 0 |
| **h2** | 22px | 700 | 2px bottom border (accent color) | 40px |
| **h3** | 18px | 700 | none | 28px |
| **h4** | 15px | 700 | none | 20px |

```css
h2 {
  font-size: 22px;
  font-weight: 700;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 8px;
  margin: 40px 0 20px 0;
  color: var(--text);
}
```

### Body Text

```css
p { margin-bottom: 14px; }

a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }
```

---

## 5. Cover Page

### Layout

```css
.cover-area {
  margin: 0 -60px 48px -60px;
  padding: 0 60px 40px 60px;
  border-bottom: 3px solid var(--primary);
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.cover-top-bar {
  background: var(--primary);
  height: 6px;
  margin: 0 -60px 32px -60px;
  width: calc(100% + 120px);
}

.cover-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.cover-brand .brand-logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.5px;
}

.cover-brand .brand-sep {
  color: var(--border);
  font-size: 18px;
}

.cover-brand .brand-dept {
  font-size: 13px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cover-area h1 {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.cover-area .subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 48px;
  font-weight: 400;
}
```

### Metadata Grid

```css
.cover-meta-box {
  background: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 32px;
  max-width: 640px;
}

.cover-meta-box .meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cover-meta-box dt {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cover-meta-box dd {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-left: 0;
}
```

---

## 6. Code Blocks

### Inline Code

```css
code {
  font-family: "SFMono-Regular", "Courier New", monospace;
  font-size: 13px;
  background: var(--code-inline-bg);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--code-inline-text);
}
```

### Block Code (Dark Theme)

```css
pre {
  font-family: "SFMono-Regular", "Courier New", monospace;
  font-size: 14.5px;
  line-height: 1.65;
  background: var(--code-bg);
  color: #ffffff;
  padding: 18px;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-break: break-word;
}

pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
```

---

## 7. Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 13px;
}

thead th {
  background: var(--table-header);
  font-weight: 700;
  padding: 10px 12px;
  text-align: left;
  border: 1px solid var(--border);
  vertical-align: top;
}

tbody td {
  padding: 10px 12px;
  border: 1px solid var(--border);
  vertical-align: top;
}

tbody tr:nth-child(odd)  td { background: var(--bg); }
tbody tr:nth-child(even) td { background: var(--bg-light); }
```

---

## 8. Callout Boxes

### Base Styles

```css
.callout {
  padding: 14px 18px;
  margin-bottom: 18px;
  border-left: 4px solid;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.5;
  page-break-inside: avoid;
}

.callout strong:first-child {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.callout p:last-child { margin-bottom: 0; }
.callout code { background: rgba(0,0,0,0.07); }
```

### Variants

```css
.callout.note {
  background: var(--note-bg);
  border-color: var(--note-border);
}
.callout.note strong:first-child { color: var(--primary); }

.callout.warning {
  background: var(--warning-bg);
  border-color: var(--warning-border);
}
.callout.warning strong:first-child { color: #007A20; }

.callout.important {
  background: var(--important-bg);
  border-color: var(--important-border);
}
.callout.important strong:first-child { color: var(--primary-dark); }
```

### Usage

```html
<div class="callout note">
  <strong>Note:</strong>
  <p>Informational message here.</p>
</div>

<div class="callout warning">
  <strong>Warning:</strong>
  <p>Cautionary message here.</p>
</div>

<div class="callout important">
  <strong>Important:</strong>
  <p>Critical information here.</p>
</div>
```

---

## 9. Numbered Steps

```css
.step-list {
  counter-reset: step;
  list-style: none;
  margin-left: 0;
}

.step-list li {
  counter-increment: step;
  margin-bottom: 12px;
  padding-left: 36px;
  position: relative;
}

.step-list li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 26px;
  height: 26px;
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-list li strong { display: block; }
```

---

## 10. Table of Contents

```css
.toc { margin-bottom: 32px; }

.toc ul { list-style: none; margin-left: 0; }
.toc > ul > li { margin-bottom: 4px; }
.toc > ul > li > a { font-weight: 600; }
.toc ul ul { margin-left: 20px; }
.toc ul ul li a { font-weight: 400; }
```

---

## 11. Print Styles (PDF Generation)

### Page Setup

```css
@media print {
  @page {
    size: A4;
    margin: 22mm 18mm 18mm 18mm;
    
    @top-left {
      content: "";
      border-bottom: 1px solid var(--primary);
      padding-bottom: 2mm;
    }
    @top-right {
      content: "Document Title — Subtitle";
      font-size: 8.5px;
      font-weight: 600;
      color: var(--primary);
      border-bottom: 1px solid var(--primary);
      padding-bottom: 2mm;
    }
    @bottom-left {
      content: "";
      border-top: 0.5px solid var(--border);
      padding-top: 2mm;
    }
    @bottom-right {
      content: "Page " counter(page) " of " counter(pages);
      font-size: 8.5px;
      color: var(--text-secondary);
      border-top: 0.5px solid var(--border);
      padding-top: 2mm;
    }
  }
  
  @page :first {
    margin-top: 15mm;
    @top-left { content: none; border: none; }
    @top-right { content: none; border: none; }
    @bottom-left { content: none; border: none; }
    @bottom-right { content: none; border: none; }
  }

  body {
    font-size: 11.5px;
    line-height: 1.55;
    max-width: 100%;
    padding: 0 !important;
    margin: 0;
  }

  /* Hide web-only elements */
  .top-bar, .header-bar { display: none !important; }

  /* Cover page adjustments */
  .cover-area {
    page-break-after: always;
    margin: 0 -18mm 0 -18mm;
    padding: 0 18mm 40px 18mm;
  }
  .cover-top-bar {
    margin: 0 -18mm 24px -18mm;
    width: calc(100% + 36mm);
  }

  /* Prevent breaks inside elements */
  pre, table, svg, .callout, .diagram, .toc {
    page-break-inside: avoid;
  }
  
  /* Prevent breaks after headings */
  h2, h3, h4 {
    page-break-after: avoid;
  }
  
  /* Orphans and widows control */
  p, li, dd {
    orphans: 3;
    widows: 3;
  }
  
  /* Links in print */
  a { color: var(--text); text-decoration: none; }
}
```

---

## 12. Optional Components

### Top Accent Bar

```css
.top-bar {
  background: var(--accent);
  height: 8px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
```

### Header Bar

```css
.header-bar {
  background: var(--primary);
  color: #fff;
  padding: 16px 60px;
  margin: 0 -60px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-bar .logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
}

.header-bar .logo span {
  color: #fff;
  font-weight: 300;
}

.header-bar .doc-title {
  font-size: 14px;
  color: #ccc;
  margin-left: auto;
}
```

### Diagram Container

```css
.diagram {
  margin: 24px 0;
  padding: 24px;
  background: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow-x: auto;
}
```

---

## 13. Complete Minimal Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document Title</title>
<style>
  :root {
    --primary: #0033A1;
    --primary-dark: #001D6E;
    --accent: #00BB31;
    --text: #16191F;
    --text-secondary: #545B64;
    --bg: #FFFFFF;
    --bg-light: #FAFAFA;
    --border: #D5DBDB;
    --code-bg: #001D6E;
    --code-inline-bg: #F2F3F3;
    --code-inline-text: #D14;
    --table-header: #F2F3F3;
    --note-bg: #EBF5FB;
    --note-border: #0033A1;
    --warning-bg: #FEF5E7;
    --warning-border: #00BB31;
    --important-bg: #FEF9E7;
    --important-border: #0033A1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
    background: var(--bg);
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 60px;
  }

  /* Cover */
  .cover-area {
    margin: 0 -60px 48px -60px;
    padding: 0 60px 40px 60px;
    border-bottom: 3px solid var(--primary);
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  }
  .cover-top-bar {
    background: var(--primary);
    height: 6px;
    margin: 0 -60px 32px -60px;
    width: calc(100% + 120px);
  }
  .cover-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .cover-brand .brand-logo {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 0.5px;
  }
  .cover-brand .brand-sep { color: var(--border); font-size: 18px; }
  .cover-brand .brand-dept {
    font-size: 13px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .cover-area h1 {
    font-size: 36px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 12px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .cover-area .subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: 48px;
    font-weight: 400;
  }
  .cover-meta-box {
    background: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 20px 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 32px;
    max-width: 640px;
  }
  .cover-meta-box .meta-item { display: flex; flex-direction: column; gap: 4px; }
  .cover-meta-box dt {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .cover-meta-box dd {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    margin-left: 0;
  }

  /* Headings */
  h1 { font-size: 28px; font-weight: 700; margin-bottom: 16px; color: var(--text); }
  h2 {
    font-size: 22px;
    font-weight: 700;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 8px;
    margin: 40px 0 20px 0;
    color: var(--text);
  }
  h3 { font-size: 18px; font-weight: 700; margin: 28px 0 14px 0; color: var(--text); }
  h4 { font-size: 15px; font-weight: 700; margin: 20px 0 10px 0; color: var(--text); }

  p { margin-bottom: 14px; }
  a { color: var(--primary); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Code */
  code {
    font-family: "SFMono-Regular", "Courier New", monospace;
    font-size: 13px;
    background: var(--code-inline-bg);
    padding: 2px 5px;
    border-radius: 3px;
    color: var(--code-inline-text);
  }
  pre {
    font-family: "SFMono-Regular", "Courier New", monospace;
    font-size: 14.5px;
    line-height: 1.65;
    background: var(--code-bg);
    color: #ffffff;
    padding: 18px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  pre code { background: transparent; padding: 0; color: inherit; font-size: inherit; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 13px;
  }
  thead th {
    background: var(--table-header);
    font-weight: 700;
    padding: 10px 12px;
    text-align: left;
    border: 1px solid var(--border);
    vertical-align: top;
  }
  tbody td {
    padding: 10px 12px;
    border: 1px solid var(--border);
    vertical-align: top;
  }
  tbody tr:nth-child(odd) td { background: var(--bg); }
  tbody tr:nth-child(even) td { background: var(--bg-light); }

  /* Callouts */
  .callout {
    padding: 14px 18px;
    margin-bottom: 18px;
    border-left: 4px solid;
    border-radius: 4px;
    font-size: 13px;
    line-height: 1.5;
  }
  .callout strong:first-child { display: block; font-size: 14px; margin-bottom: 4px; }
  .callout p:last-child { margin-bottom: 0; }
  .callout code { background: rgba(0,0,0,0.07); }
  .callout.note { background: var(--note-bg); border-color: var(--note-border); }
  .callout.note strong:first-child { color: var(--primary); }
  .callout.warning { background: var(--warning-bg); border-color: var(--warning-border); }
  .callout.warning strong:first-child { color: #007A20; }
  .callout.important { background: var(--important-bg); border-color: var(--important-border); }
  .callout.important strong:first-child { color: var(--primary-dark); }

  /* TOC */
  .toc { margin-bottom: 32px; }
  .toc ul { list-style: none; margin-left: 0; }
  .toc > ul > li { margin-bottom: 4px; }
  .toc > ul > li > a { font-weight: 600; }
  .toc ul ul { margin-left: 20px; }
  .toc ul ul li a { font-weight: 400; }

  /* Print */
  @media print {
    @page {
      size: A4;
      margin: 22mm 18mm 18mm 18mm;
      @top-left { content: ""; border-bottom: 1px solid var(--primary); padding-bottom: 2mm; }
      @top-right {
        content: "Document Title";
        font-size: 8.5px;
        font-weight: 600;
        color: var(--primary);
        border-bottom: 1px solid var(--primary);
        padding-bottom: 2mm;
      }
      @bottom-left { content: ""; border-top: 0.5px solid var(--border); padding-top: 2mm; }
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-size: 8.5px;
        color: var(--text-secondary);
        border-top: 0.5px solid var(--border);
        padding-top: 2mm;
      }
    }
    @page :first {
      margin-top: 15mm;
      @top-left { content: none; border: none; }
      @top-right { content: none; border: none; }
      @bottom-left { content: none; border: none; }
      @bottom-right { content: none; border: none; }
    }
    body { font-size: 11.5px; line-height: 1.55; max-width: 100%; padding: 0 !important; margin: 0; }
    .cover-area { page-break-after: always; margin: 0 -18mm 0 -18mm; padding: 0 18mm 40px 18mm; }
    .cover-top-bar { margin: 0 -18mm 24px -18mm; width: calc(100% + 36mm); }
    pre, table, svg, .callout { page-break-inside: avoid; }
    h2, h3, h4 { page-break-after: avoid; }
    p, li, dd { orphans: 3; widows: 3; }
    a { color: var(--text); text-decoration: none; }
  }
</style>
</head>
<body>

  <div class="cover-area">
    <div class="cover-top-bar"></div>
    <div class="cover-brand">
      <span class="brand-logo">Company</span>
      <span class="brand-sep">|</span>
      <span class="brand-dept">Department</span>
    </div>
    <h1>Document Title</h1>
    <div class="subtitle">Subtitle · Keywords</div>
    <dl class="cover-meta-box">
      <div class="meta-item"><dt>Project</dt><dd>project-name</dd></div>
      <div class="meta-item"><dt>Version</dt><dd>1.0</dd></div>
    </dl>
  </div>

  <div class="toc">
    <h2 style="border: none; margin-top: 0;">Table of Contents</h2>
    <ul>
      <li><a href="#intro">1. Introduction</a></li>
    </ul>
  </div>

  <section id="intro">
    <h2>1. Introduction</h2>
    <p>Content here...</p>
  </section>

</body>
</html>
```

---

## 14. Rules & Best Practices

1. **Single file**: All CSS in `<style>`, no external files
2. **No frameworks**: Pure HTML/CSS, no Bootstrap/Tailwind
3. **Print-first**: Design for PDF output, web is secondary
4. **Consistent spacing**: 14px paragraph margin, 40px section margin
5. **Color discipline**: Use CSS variables only, no hardcoded colors in HTML
6. **Code contrast**: Dark blocks for multi-line, light inline for single words
7. **Table readability**: Zebra striping, left-aligned text, top vertical-align
8. **Callout hierarchy**: Note (info) → Warning (caution) → Important (critical)
9. **Heading anchors**: Every h2/h3 must have an `id` for TOC linking
10. **Page breaks**: Cover gets `page-break-after: always`, never force breaks mid-content

---

## 15. Customization Guide

| To change | Modify | Example |
|-----------|--------|---------|
| **Primary color** | `--primary` | `#1a73e8` (Google blue) |
| **Accent color** | `--accent` | `#ea4335` (Google red) |
| **Code theme** | `--code-bg` | `#282c34` (Atom dark) |
| **Font** | `font-family` | `"Segoe UI", sans-serif` |
| **Max width** | `max-width` | `800px` or `1000px` |
| **Page size** | `@page size` | `letter` for US |
| **Margins** | `@page margin` | `25mm 20mm` |

---

## 16. File Organization

```
document.html          # Single self-contained file
├── <style>            # All CSS (300-500 lines)
├── <body>
│   ├── Cover Page     # .cover-area
│   ├── TOC            # .toc
│   ├── Section 1      # <section id="...">
│   ├── Section 2
│   └── ...
└── </body>
```

No build step. No dependencies. Open in browser → Print to PDF.
