import { useState, useEffect } from 'react';
import { cognitoService } from '../services/cognito-service';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any | null;
    error: Error | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        error: null
    });

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const isAuthenticated = await cognitoService.isAuthenticated();
            if (isAuthenticated) {
                const { attributes } = await cognitoService.getCurrentUser();
                setAuthState({
                    isAuthenticated: true,
                    isLoading: false,
                    user: attributes,
                    error: null
                });
            } else {
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                    error: null
                });
            }
        } catch (error) {
            setAuthState({
                isAuthenticated: false,
                isLoading: false,
                user: null,
                error: error as Error
            });
        }
    };

    return {
        ...authState,
        refresh: checkAuthStatus
    };
};
