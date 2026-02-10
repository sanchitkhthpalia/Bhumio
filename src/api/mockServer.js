/**
 * Simulates a backend API for form submission.
 * 
 * Rules:
 * - 50% chance of success
 * - Random server-side validation errors even if client-side looks good
 * - Simulated network delay (1-3 seconds)
 */

export const mockSubmitForm = async (data) => {
    return new Promise((resolve) => {
        // Simulate network delay
        const delay = Math.floor(Math.random() * 2000) + 1000;

        setTimeout(() => {
            // Simulate random server decisions
            const randomOutcome = Math.random();

            // Validation Logic on Server (Simulating mismatched rules)
            const errors = [];

            // Server-side email check (simulating a stricter on blocked domain list)
            if (data.email && data.email.endsWith('@example.com')) {
                errors.push({ field: 'email', message: 'Email domain @example.com is currently blacklisted.' });
            }

            // Server-side amount check (maybe they have a dynamic limit)
            if (data.amount > 5000) {
                errors.push({ field: 'amount', message: 'Server limit for transfer is currently 5000.' });
            }

            // Random "business logic" failure
            if (randomOutcome < 0.3) {
                if (!errors.some(e => e.field === 'email')) { // Don't duplicate if already exists
                    errors.push({ field: 'email', message: 'Account validation failed on the server.' });
                }
            }

            if (errors.length > 0) {
                resolve({
                    success: false,
                    errors: errors
                });
            } else {
                resolve({
                    success: true,
                    message: 'Transaction submitted successfully!'
                });
            }
        }, delay);
    });
};
