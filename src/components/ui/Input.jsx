
export const Input = ({ label, name, type = "text", value, onChange, error, serverError, placeholder, disabled, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
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
            px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all
            ${error
                        ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-900'
                        : serverError
                            ? 'border-orange-500 focus:ring-orange-200 bg-orange-50 text-orange-900'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white'
                    }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
          `}
                {...props}
            />
            {/* Client Error */}
            {error && (
                <span className="text-xs text-red-600 font-medium flex items-center gap-1 animate-fadeIn">
                    ⚠️ {error}
                </span>
            )}
            {/* Server Error - Distinct Style */}
            {serverError && !error && (
                <span className="text-xs text-orange-600 font-medium flex items-center gap-1 animate-fadeIn">
                    Server Message: {serverError}
                </span>
            )}
        </div>
    );
};
