import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import MainLayout from '../components/Layouts/MainLayout';
import { routes } from './routes';

const getLayoutElement = (route: any) => {
    if (route.layout === 'blank') return <BlankLayout>{route.element}</BlankLayout>;
    if (route.layout === 'main') return <MainLayout>{route.element}</MainLayout>;
    return <DefaultLayout>{route.element}</DefaultLayout>;
};

const finalRoutes = routes.map((route) => ({
    ...route,
    element: getLayoutElement(route),
}));

const router = createBrowserRouter(finalRoutes);

export default router;