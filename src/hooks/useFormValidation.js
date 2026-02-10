import { useState, useEffect, useCallback } from 'react';
import { validateEmail, validateAmount } from '../utils/validators';

/**
 * Manages form state, validation, and submission.
 * @param {Object} dynamicRules - Current validation rules from useDynamicValidation
 * @param {Function} submitApi - Async function to submit data
 */
export const useFormValidation = (dynamicRules, submitApi) => {
    const [values, setValues] = useState({ email: '', amount: '' });
    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    // Validate on change or when rules change
    const validate = useCallback(() => {
        const errors = {};

        const emailError = validateEmail(values.email, dynamicRules.blockedDomains);
        if (emailError) errors.email = emailError;

        const amountError = validateAmount(values.amount, dynamicRules.maxAmount);
        if (amountError) errors.amount = amountError;

        return errors;
    }, [values, dynamicRules]);

    // Real-time validation effect
    useEffect(() => {
        // Only validate if user has typed something to avoid initial errors
        // Or we could have a "touched" state. For simplicity, we'll validate if values are present.
        // However, the requirements say "UI must adapt without losing user input".
        // If rules change, we should show errors immediately if the input is now invalid.

        if (values.email || values.amount) {
            const currentErrors = validate();
            setClientErrors(currentErrors);
        }
    }, [validate, values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        // Clear server error for this field when user types
        if (serverErrors[name]) {
            setServerErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Clear global success message on change
        if (submitSuccess) setSubmitSuccess(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final client-side check
        const errors = validate();
        setClientErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Stop if client errors exist
        }

        setIsSubmitting(true);
        setServerErrors({});
        setSubmitSuccess(null);

        try {
            const result = await submitApi(values);

            if (result.success) {
                setSubmitSuccess(result.message);
                // Optional: clear form or keep it. Requirement: "No duplicate submissions". 
                // We might want to disable button (handled by isSubmitting).
            } else {
                // Map server errors array to object
                const serverErrObj = {};
                result.errors.forEach(err => {
                    serverErrObj[err.field] = err.message;
                });
                setServerErrors(serverErrObj);
            }
        } catch (error) {
            setServerErrors({ form: 'Network error or unexpected failure.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        clientErrors,
        serverErrors,
        isSubmitting,
        submitSuccess,
        handleChange,
        handleSubmit
    };
};
