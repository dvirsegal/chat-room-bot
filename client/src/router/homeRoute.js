import config from '../config';
import updateNavbar from './navbarUpdater';

const homeRoute = {
    path: '/',
    name: 'home',
    component: 'home-page',
    metadata: {
        title: config.appName,
        titleTemplate: null,
        description: config.appDescription
    },
    action: async () => {
        await import('../pages/home');
        updateNavbar();
    }
};

export default homeRoute;
