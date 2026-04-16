---
name: recurring_bugs
description: Recurring bugs and anti-patterns observed across reviews of this codebase
type: project
---

## Stale closure on state update (App.jsx)
`handleAdd` and `handleDelete` both close over the `transactions` snapshot from the last render rather than using the functional updater form (`prev => ...`). This is a recurring pattern to watch for whenever new event handlers are added to App.jsx.

**Why:** React batches state updates; closing over stale state can cause lost updates if two state changes fire in rapid succession.
**How to apply:** Every new setState call that references the current state value should use `setTransactions(prev => ...)`.

## Amount display formatting
Dollar amounts are rendered with template literals (`$${t.amount}`) without `toFixed(2)` or `Intl.NumberFormat`. Floating point arithmetic on amounts (e.g., 0.1 + 0.2) will produce ugly output. Watch for this in Summary.jsx, TransactionList.jsx, and SpendingChart.jsx tooltips.

## categories array duplication
As of 2026-04-16, `categories` is defined identically in both TransactionForm.jsx and TransactionList.jsx. No shared constants file exists. Flag any future component that defines its own local copy.
