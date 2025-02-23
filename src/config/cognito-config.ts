interface CognitoConfig {
  UserPoolId: string;
  ClientId: string;
  GoogleClientId: string; 
}

export const cognitoConfig: CognitoConfig = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  GoogleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
};