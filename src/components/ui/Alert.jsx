export const Alert = ({ type = 'success', message, onClose }) => {
    if (!message) return null;

    const styles = {
        success: 'bg-green-100 text-green-800 border-green-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };

    return (
        <div className={`p-4 rounded-lg border ${styles[type]} flex items-start justify-between animate-fadeIn`}>
            <div className="flex gap-2">
                <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
                <p className="font-medium text-sm">{message}</p>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">✕</button>
            )}
        </div>
    );
};
