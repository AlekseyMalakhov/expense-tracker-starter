# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a single-component React app (Vite + React 19). All logic lives in `src/App.jsx` — there are no sub-components, routing, or external state libraries.

**State in `App.jsx`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string**, which causes a known bug: `reduce` concatenates instead of summing, so totals display incorrectly.
- `filterType` / `filterCategory` — control which transactions are shown in the table.
- Form fields (`description`, `amount`, `type`, `category`) are controlled inputs that reset on submit.

**Known issues (intentional, part of the course):**
- `amount` is never parsed to a number, so arithmetic on totals is broken.
- UI is intentionally plain/unstyled.
- Code structure is intentionally monolithic.
