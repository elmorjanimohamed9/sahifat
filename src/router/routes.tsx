import { lazy } from 'react';
const Index = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Register = lazy(() => import('../pages/auth/Register'));
const Login = lazy(() => import('../pages/auth/Login'));
const Books = lazy(() => import('../pages/Books'));
const Contact = lazy(() => import('../pages/Contact'));
const BookDetails = lazy(() => import('../pages/BookDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const AllBooks = lazy(() => import('../pages/dashboard/AllBooks'));
const Categories = lazy(() => import('../pages/dashboard/Categories'));
const routes = [
    // dashboard
    {
        path: '/dashboard/books',
        element: <AllBooks />,
        layout: 'default',
    },
    {
        path: '/dashboard/categories',
        element: <Categories />,
        layout: 'default',
    },
    {
        path: '/',
        element: <Index />,
        layout: 'main',
    },
    {
        path: '/auth/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/auth/verify-email',
        element: <VerifyEmail />,
        layout: 'blank',
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank',
    },
    {
        path: '/auth/reset-password',
        element: <ResetPassword />,
        layout: 'blank',
    },
    {
        path: '/books',
        element: <Books />,
        layout: 'main',
    },
    {
        path: '/about',
        element: <About />,
        layout: 'main',
    },
    {
        path: '/contact',
        element: <Contact />,
        layout: 'main',
    },
    {
        path: '/book/:id',
        element: <BookDetails />,
        layout: 'main',
    },
    {
        path: '/profile',
        element: <Profile />,
        layout: 'main',
    },
];

export { routes };
