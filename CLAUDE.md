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

React 19 + Vite app. No routing or external state libraries.

**Component tree:**
- `App` — holds `transactions` state (`{ id, description, amount, type, category, date }`), passes it down. `amount` is always a number.
- `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- `TransactionForm` — owns its own form state; calls `onAdd(transaction)` prop on submit.
- `TransactionList` — receives `transactions`, owns filter state (`filterType`, `filterCategory`) internally.

**Shared constant:** `categories` array is defined locally in both `TransactionForm` and `TransactionList`.
