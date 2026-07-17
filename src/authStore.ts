let inMemoryToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    inMemoryToken = token;
};

export const getAccessToken = () => {
    return inMemoryToken;
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = (async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
            });

            if (!response.ok) throw new Error('Refresh failed');

            const data = await response.json();
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            setAccessToken(null);
            return null;
        } finally {
            isRefreshing = false;
        }
    })();

    return refreshPromise;
};