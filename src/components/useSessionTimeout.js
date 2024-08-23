import { useState, useEffect } from 'react';

const useSessionTimeout = (timeoutDuration,onTimeout) => {
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        let timeout;
        let lastActivity = Date.now();

        const handleActivity = () => {
            lastActivity = Date.now();
            if (isTimedOut) setIsTimedOut(false); // Reset timeout state
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (Date.now() - lastActivity >= timeoutDuration) {
                    setIsTimedOut(true);
                    if (onTimeout) onTimeout();
                }
            }, timeoutDuration - (Date.now() - lastActivity));
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);
        
        timeout = setTimeout(() => {
            if (Date.now() - lastActivity >= timeoutDuration) {
                setIsTimedOut(true);
                if (onTimeout) onTimeout();
            }
        }, timeoutDuration);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            clearTimeout(timeout);
        };
    }, [timeoutDuration, isTimedOut, onTimeout]);

    return isTimedOut;
};

export default useSessionTimeout;
