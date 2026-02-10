# Validation That Lies

A React application demonstrating dynamic client-side validation coupled with simulated, unpredictable server-side validation.

## Features

- **Dynamic Client Validation**: Validation rules (e.g., Max Amount, Blocked Domains) change automatically every 10 seconds.
- **Simulated Server**: A mock backend that introduces random failures, network delays, and separate validation logic.
- **Robust Error Handling**: Distinct visual treatments for client vs. server errors. Input is never lost on error.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.

## Example Validation Scenarios

### Scenario A: Client Rejection (Fast Fail)
1.  **Action**: User types an email with a blocked domain (e.g., `test@scam.com`).
2.  **Result**: The input border turns **RED** immediately.
3.  **UI Feedback**: A "❌ Domain blocked" message appears. The submit button is disabled.

### Scenario B: Server Rejection (Latency + Rule Mismatch)
1.  **Action**: User types a valid amount (e.g., `$4000`) and submits.
2.  **Result**: 
    *   Form enters "Loading" state (spinner).
    *   After 1-2 seconds, the server rejects it because its internal limit is strict ($5000 max, or random failure).
3.  **UI Feedback**: 
    *   The input border turns **AMBER/ORANGE**.
    *   A "⚠️ Server: Limit exceeded" message appears below the input.
    *   **Crucially**, the user's input remains for them to correct.

### Scenario C: Success (The Happy Path)
1.  **Action**: User fixes errors and resubmits.
2.  **Result**: Server accepts the transaction.
3.  **UI Feedback**: A green success banner appears: "Transaction submitted successfully!".

## Why Separate Client & Server Validation?

Real-world applications must treat client validation as a **UX enhancement** and server validation as the **source of truth**.
-   **Client**: Fast feedback, prevents obvious errors, saves bandwidth.
-   **Server**: Security gateway, handles race conditions (e.g., rule changed during latency), and validates against private data (e.g., DB constraints).
-   This app forces this separation by making the two layers potentially disagree.

## How to Test

**Option 1: Development Mode**
1.  `npm install`
2.  `npm run dev`
3.  Open `http://localhost:5173`.
    -   Watch the **"Current Rules"** box flash when rules update.
    -   Try to "race" the rules: Type a valid amount, wait for the limit to drop, and see validation fail instantly.

**Option 2: Production Build**
1.  `npm run build`
2.  `npm run preview`
3.  Open `http://localhost:4173` to test the optimized build.

## Project Structure

-   `src/components/`: UI components (Form, Input, Button, Alert).
-   `src/hooks/`: Custom hooks for logic (`useFormValidation`, `useDynamicValidation`).
-   `src/api/`: Simulated backend logic.
-   `src/utils/`: Pure validation functions.
