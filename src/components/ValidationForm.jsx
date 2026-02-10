import React from 'react';
import { useDynamicValidation } from '../hooks/useDynamicValidation';
import { useFormValidation } from '../hooks/useFormValidation';
import { mockSubmitForm } from '../api/mockServer';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Alert } from './ui/Alert';

export const ValidationForm = () => {
    // 1. Get dynamic rules
    const rules = useDynamicValidation();

    // 2. Initialize form with rules and submit handler
    const {
        values,
        clientErrors,
        serverErrors,
        isSubmitting,
        submitSuccess,
        handleChange,
        handleSubmit
    } = useFormValidation(rules, mockSubmitForm);

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Validation That Lies
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
                Rules change randomly. Proceed with caution.
            </p>

            {/* Dynamic Rules Indicator */}
            <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800">
                <p className="font-semibold mb-1">Current Rules (Live Updates):</p>
                <ul className="list-disc pl-4 space-y-0.5">
                    <li>Max Amount: <strong>${rules.maxAmount}</strong></li>
                    <li>Blocked Domains: {rules.blockedDomains.map(d => <span key={d} className="bg-blue-100 px-1 rounded mx-0.5">{d}</span>)}</li>
                </ul>
            </div>

            {/* Success Alert */}
            {submitSuccess && (
                <div className="mb-4">
                    <Alert type="success" message={submitSuccess} />
                </div>
            )}

            {/* Global Server Error (if not specific to a field) */}
            {serverErrors.form && (
                <div className="mb-4">
                    <Alert type="error" message={serverErrors.form} />
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    error={clientErrors.email}
                    serverError={serverErrors.email}
                    disabled={isSubmitting}
                />

                {/* Amount Field */}
                <Input
                    label="Transfer Amount ($)"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={values.amount}
                    onChange={handleChange}
                    error={clientErrors.amount}
                    serverError={serverErrors.amount}
                    disabled={isSubmitting}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full mt-2"
                >
                    {isSubmitting ? 'Validating...' : 'Submit Transaction'}
                </Button>
            </form>
        </div>
    );
};
