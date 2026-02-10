/**
 * Validates an email address against a regex and a list of blocked domains.
 * @param {string} email 
 * @param {string[]} blockedDomains 
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email, blockedDomains = []) => {
    if (!email) return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {
        return `Domain @${domain} is currently not allowed`;
    }

    return null;
};

/**
 * Validates a numeric amount against a max limit.
 * @param {string|number} amount 
 * @param {number} maxLimit 
 * @returns {string|null} Error message or null if valid
 */
export const validateAmount = (amount, maxLimit) => {
    if (!amount && amount !== 0) return 'Amount is required';

    const numAmount = Number(amount);
    if (isNaN(numAmount)) return 'Amount must be a number';
    if (numAmount <= 0) return 'Amount must be greater than 0';
    if (maxLimit && numAmount > maxLimit) {
        return `Amount exceeds current limit of ${maxLimit}`;
    }

    return null;
};
