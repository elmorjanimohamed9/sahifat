import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute, ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js';
import { cognitoConfig } from '../config/cognito-config';

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
});

interface UserAttributes {
    email?: string;
    name?: string;
    phone_number?: string;
    sub?: string;
    email_verified?: boolean;
    [key: string]: any;
}

interface GoogleUserInfo {
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}

export const cognitoService = {
    signUp: (email: string, password: string, name: string, phoneNumber: string) => {
        return new Promise((resolve, reject) => {
            const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email,
                }),
                new CognitoUserAttribute({
                    Name: 'name',
                    Value: name,
                }),
                new CognitoUserAttribute({
                    Name: 'phone_number',
                    Value: phoneNumber,
                }),
            ];

            userPool.signUp(email, password, attributeList, [], (err: Error | undefined, result: ISignUpResult | undefined) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    signIn: (email: string, password: string, rememberMe: boolean = false) => {
        return new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
                Storage: rememberMe ? localStorage : sessionStorage // Use appropriate storage based on remember me
            });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    // If remember me is true, set the persistence to localStorage
                    if (rememberMe) {
                        cognitoUser.setSignInUserSession(result);
                    }
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    },

    signOut: () => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
    },

    verifyEmail: (username: string, code: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    resendVerificationEmail: (username: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.resendConfirmationCode((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    isUserVerified: (username: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.getUserAttributes((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                const emailVerified = result?.find(attr =>
                    attr.getName() === 'email_verified'
                )?.getValue();
                resolve(emailVerified === 'true');
            });
        });
    },

    getCurrentUser: () => {
        return new Promise<{
            session: CognitoUserSession;
            attributes: UserAttributes;
        }>((resolve, reject) => {
            const cognitoUser = userPool.getCurrentUser();

            if (!cognitoUser) {
                reject(new Error('No user found'));
                return;
            }

            cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!session) {
                    reject(new Error('No valid session'));
                    return;
                }

                // Get user attributes
                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const userAttributes: UserAttributes = {};
                    attributes?.forEach(attr => {
                        userAttributes[attr.getName()] = attr.getValue();
                    });

                    resolve({
                        session,
                        attributes: userAttributes
                    });
                });
            });
        });
    },

    // Helper method to check if user is authenticated
    isAuthenticated: async () => {
        try {
            const cognitoUser = userPool.getCurrentUser();
            if (!cognitoUser) return false;

            return new Promise((resolve) => {
                cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                    if (err || !session) {
                        resolve(false);
                        return;
                    }
                    resolve(session.isValid());
                });
            });
        } catch (error) {
            return false;
        }
    },

    // Get JWT tokens
    getTokens: async () => {
        try {
            const cognitoUser = userPool.getCurrentUser();
            if (!cognitoUser) {
                throw new Error('No user found');
            }

            return new Promise<{
                accessToken: string;
                idToken: string;
                refreshToken: string;
            }>((resolve, reject) => {
                cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                    if (err || !session) {
                        reject(err || new Error('No valid session'));
                        return;
                    }

                    resolve({
                        accessToken: session.getAccessToken().getJwtToken(),
                        idToken: session.getIdToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken()
                    });
                });
            });
        } catch (error) {
            throw error;
        }
    },

    // Refresh session
    refreshSession: async () => {
        try {
            const cognitoUser = userPool.getCurrentUser();
            if (!cognitoUser) {
                throw new Error('No user found');
            }

            return new Promise<CognitoUserSession>((resolve, reject) => {
                cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                    if (err || !session) {
                        reject(err || new Error('No valid session'));
                        return;
                    }

                    cognitoUser.refreshSession(session.getRefreshToken(), (err, session) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(session);
                    });
                });
            });
        } catch (error) {
            throw error;
        }
    },

    forgotPassword: (username: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.forgotPassword({
                onSuccess: (data) => {
                    resolve(data);
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    },

    confirmNewPassword: (username: string, code: string, newPassword: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool
            });

            cognitoUser.confirmPassword(code, newPassword, {
                onSuccess: () => {
                    resolve('Password confirmed successfully');
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    },
};
