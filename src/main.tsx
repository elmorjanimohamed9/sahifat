import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

// Auth
import { AuthProvider } from 'react-oidc-context';

// Sonner Toaster
import { Toaster } from 'sonner';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_friO9OL0f",
    client_id: "64ka71vntr1mq95mln0mg97jg1",
    redirect_uri: "http://localhost:5173/",
    response_type: "code",
    scope: "aws.cognito.signin.user.admin email openid phone profile",
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <Suspense>
                <Provider store={store}>
                    <RouterProvider router={router} />
                    <Toaster richColors />
                </Provider>
            </Suspense>
        </AuthProvider>
    </React.StrictMode>
);