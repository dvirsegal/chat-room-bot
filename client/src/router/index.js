import {Router} from '@vaadin/router';

import {routes} from './routes';

const router = new Router();

window.__router = router;

router.setRoutes([
    {
        path: '(.*)/',
        action: (context, commands) => {
            const newPath = context.pathname.slice(0, -1);
            return commands.redirect(newPath);
        }
    },
    ...routes
]).then(r => {
    console.debug('router redirected without trailing slash', r);
});

/**
 * setup router from specific route config
 * @param outlet HTMLElement
 */
export const attachRouter = (outlet) => {
    router.setOutlet(outlet);
};
