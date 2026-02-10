import { useState, useEffect } from 'react';

/**
 * Custom hook that simulates changing validation rules from a "configuration server"
 * or just runtime dynamics.
 */
export const useDynamicValidation = () => {
    const [rules, setRules] = useState({
        maxAmount: 1000,
        blockedDomains: ['scam.com', 'tempmail.com']
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly change max amount
            const newMax = Math.random() > 0.5 ? 5000 : 1000;

            // Randomly toggle a blocked domain
            const domains = ['scam.com', 'tempmail.com'];
            if (Math.random() > 0.7) {
                domains.push('gmail.com'); // Evil twist: sometimes block gmail
            }

            setRules({
                maxAmount: newMax,
                blockedDomains: domains
            });

        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return rules;
};
