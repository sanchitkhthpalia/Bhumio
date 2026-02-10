
export const Input = ({ label, name, type = "text", value, onChange, error, serverError, placeholder, disabled, ...props }) => {
    // Determine border color based on error state priority
    let borderColor = 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';
    let bgColor = 'bg-white';

    if (error) {
        borderColor = 'border-red-500 focus:ring-red-200';
        bgColor = 'bg-red-50 text-red-900';
    } else if (serverError) {
        borderColor = 'border-amber-500 focus:ring-amber-200';
        bgColor = 'bg-amber-50 text-amber-900';
    }

    return (
        <div className="flex flex-col gap-1 w-full group">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 flex justify-between">
                <span>{label}</span>
                {serverError && !error && (
                    <span className="text-xs text-amber-600 font-semibold animate-pulse">Server Rejected</span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`
            px-4 py-2 rounded-lg border focus:ring-4 focus:outline-none transition-all duration-200
            ${borderColor} ${bgColor}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''}
          `}
                {...props}
            />

            {/* Error Message Container with fixed height to prevent layout shift (optional, but good for UX) */}
            <div className="min-h-[20px]">
                {/* Client Error */}
                {error && (
                    <p className="text-xs text-red-600 font-bold flex items-center gap-1 animate-slideDown">
                        <span className="text-sm">❌</span> {error}
                    </p>
                )}

                {/* Server Error - Distinct Style */}
                {serverError && !error && (
                    <p className="text-xs text-amber-700 font-bold flex items-center gap-1 animate-slideDown p-1.5 bg-amber-100 rounded border border-amber-200 mt-1">
                        <span className="text-sm">⚠️</span>
                        <span>Server: {serverError}</span>
                    </p>
                )}
            </div>
        </div>
    );
};
