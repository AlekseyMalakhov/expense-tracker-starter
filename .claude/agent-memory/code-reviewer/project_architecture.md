---
name: project_architecture
description: Core architecture decisions, component responsibilities, and known structural issues in the expense tracker app
type: project
---

React 19 + Vite expense tracker. No routing, no external state libraries (intentional constraint).

Component responsibilities:
- App.jsx: owns `transactions` state, passes down. Handles add/delete.
- Summary.jsx: pure computation from props, no memo wrapping.
- TransactionForm.jsx: owns its own form state, calls onAdd prop.
- TransactionList.jsx: owns filter state (filterType, filterCategory) internally.
- SpendingChart.jsx: recharts BarChart, derives expensesByCategory from transactions prop.

Known structural issues as of first review (2026-04-16):
- `categories` array is duplicated in TransactionForm.jsx and TransactionList.jsx. No shared constants file exists yet. Always recommend `src/constants/categories.js` when flagging.
- `amount` is always a number (enforced via parseFloat in TransactionForm). Any code treating it as a string is a bug.
- Seed data in App.jsx line 14: "Freelance Work" is typed as `"expense"` but categorized as `"salary"` — likely a data bug.
- handleAdd in App.jsx uses spread over state snapshot (stale closure risk) instead of functional updater form.
- No input validation beyond empty-string guard: negative amounts, zero amounts, and NaN from bad parseFloat inputs are all accepted.
- Summary.jsx iterates transactions twice (filter+reduce for income, filter+reduce for expenses) — a single reduce would be more efficient, though minor at this scale.
- Dollar formatting uses template literals (`$${value}`) — will display wrong for decimal amounts like $1500.5 instead of $1,500.50.
- SpendingChart.jsx uses array index as Cell key, which is acceptable here since data is derived (not reordered by user), but worth noting.
- No empty-state UI in TransactionList when filtered results are empty.
- window.confirm used for delete confirmation — blocks the main thread, not accessible.

**Why:** First full review pass.
**How to apply:** Use as baseline for future incremental reviews. Flag regressions against this list.
