# Validation That Lies

A React application demonstrating dynamic client-side validation coupled with simulated, unpredictable server-side validation.

## Features

- **Dynamic Client Validation**: Validation rules (e.g., Max Amount, Blocked Domains) change automatically every 10 seconds.
- **Simulated Server**: A mock backend that introduces random failures, network delays, and separate validation logic.
- **Robust Error Handling**: Distinct visual treatments for client vs. server errors. Input is never lost on error.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.

## How It Works

### Validation Flow

1.  **Client-Side**:
    *   The `useDynamicValidation` hook rotates rules periodically.
    *   The form validates inputs in real-time against these *current* rules.
    *   Submitting is blocked if client rules are not met.

2.  **Server-Side**:
    *   Once client validation passes, data is sent to `mockServer.js`.
    *   The server mimics a real-world scenario where backend rules might differ (e.g., a blacklist not known to the client).
    *   It also simulates random network/business logic failures (approx. 30% chance).

### Error Handling

-   **Client Errors**: Shown immediately below the input in **Red**. These prevent submission.
-   **Server Errors**: Shown below the input in **Orange/Amber**. These occur after submission and do not clear user input, allowing them to correct and retry.
-   **Global Errors**: Network or generic failures are shown at the top of the form.

## Setup & Run

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run development server:
    ```bash
    npm run dev
    ```

## Project Structure

-   `src/components/`: UI components (Form, Input, Button, Alert).
-   `src/hooks/`: Custom hooks for logic (`useFormValidation`, `useDynamicValidation`).
-   `src/api/`: Simulated backend logic.
-   `src/utils/`: Pure validation functions.
