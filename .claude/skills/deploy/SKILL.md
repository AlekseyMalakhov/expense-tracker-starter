Deploy the app to staging by running tests, building the production bundle, and pushing to the staging area.

Follow these steps in order, stopping immediately if any step fails:

## Step 1 — Run tests

Run `npm run lint` to catch errors. If a dedicated test script (`npm test` or `npm run test`) exists in package.json, run that too.

Report the results. If anything fails, stop here and tell the user what failed and how to fix it. Do NOT proceed to the build step.

## Step 2 — Build production bundle

Run `npm run build`.

If the build fails, stop and report the error. Do NOT proceed to the deploy step.

## Step 3 — Push to staging

Run `npm run deploy:staging` if that script exists. Otherwise, run `npm run preview` to verify the production bundle locally and tell the user that no staging deployment script was found — they should add a `deploy:staging` script to package.json (e.g. using `netlify deploy`, `vercel --prod`, `gh-pages`, rsync to a server, etc.).

## Summary

After completing all steps, report:
- Which steps passed or were skipped
- The staging URL if deployment succeeded
- Any warnings the user should know about
