// start_of_file: ./FakeEstate/logToFile.ts

/**
 * Logs a given message to a server-side file. This function is designed to be
 * used across the application for consistent logging practices.
 * 
 * @param message - The message to log. This should be a string containing
 *                  the information to be recorded.
 */
export const logToFile = async (message: string): Promise<void> => {
    // Check if logging is enabled based on the environment variable.
    // Avoid logging in production for performance and security reasons,
    // unless explicitly required.
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
        try {
            const response = await fetch('/api/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            // Check if the request was not successful.
            if (!response.ok) {
                throw new Error(`Failed to log message, server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error logging to file:', error);
        }
    }
};

// end_of_file: ./FakeEstate/logToFile.ts
