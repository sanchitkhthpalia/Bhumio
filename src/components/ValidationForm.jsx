import React, { useEffect, useState } from 'react';
import { useDynamicValidation } from '../hooks/useDynamicValidation';
import { useFormValidation } from '../hooks/useFormValidation';
import { mockSubmitForm } from '../api/mockServer';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Alert } from './ui/Alert';

export const ValidationForm = () => {
    // 1. Get dynamic rules
    const rules = useDynamicValidation();
    const [rulesChanged, setRulesChanged] = useState(false);

    // Visual flash when rules change
    useEffect(() => {
        setRulesChanged(true);
        const timer = setTimeout(() => setRulesChanged(false), 2000);
        return () => clearTimeout(timer);
    }, [rules]);

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

    const hasClientErrors = Object.keys(clientErrors).length > 0;
    const isFormEmpty = !values.email && !values.amount;

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Validation That Lies
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
                Client rules change. Server rules differ. Good luck.
            </p>

            {/* Dynamic Rules Indicator */}
            <div className={`
                mb-6 p-4 rounded-xl border transition-all duration-500 relative overflow-hidden
                ${rulesChanged ? 'bg-indigo-50 border-indigo-300 shadow-md scale-[1.02]' : 'bg-slate-50 border-slate-200'}
            `}>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Validation Rules</p>
                    {rulesChanged && <span className="text-xs font-bold text-indigo-600 animate-pulse">UPDATED JUST NOW</span>}
                </div>

                <ul className="text-sm space-y-1 text-slate-700">
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Max Amount: <strong className="font-mono bg-white px-1.5 rounded border border-slate-200">${rules.maxAmount}</strong>
                    </li>
                    <li className="flex items-center gap-2 items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></span>
                        <span>Blocked Domains: <br />
                            {rules.blockedDomains.map(d => (
                                <span key={d} className="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-100 text-xs font-medium mr-1 mb-1">
                                    {d}
                                </span>
                            ))}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Success Alert */}
            {submitSuccess && (
                <div className="mb-4 transform transition-all duration-500 ease-out">
                    <Alert type="success" message={submitSuccess} />
                </div>
            )}

            {/* Global Server Error */}
            {serverErrors.form && (
                <div className="mb-4">
                    <Alert type="error" message={serverErrors.form} />
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    error={clientErrors.email}
                    serverError={serverErrors.email} // Explicitly pass server error
                    disabled={isSubmitting}
                />

                {/* Amount Field */}
                <Input
                    label="Transfer Amount"
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
                    disabled={hasClientErrors || isFormEmpty || isSubmitting}
                    className={`
                        w-full mt-4 py-3 text-lg transition-all duration-300
                        ${hasClientErrors ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02]'}
                    `}
                >
                    {isSubmitting ? 'Verifying with Server...' : 'Submit Transaction'}
                </Button>

                {hasClientErrors && (
                    <p className="text-center text-xs text-red-400 font-medium">
                        Please fix validation errors to proceed.
                    </p>
                )}
            </form>
        </div>
    );
};
