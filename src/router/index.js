import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/Dashboard.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/dashboard/',
            component: Dashboard,
            name: 'dashboard'
        },
        {
            path: '/about*',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/About.vue'),
            name: 'about'
        },
        {
            path: '/notfound',
            component: () =>
                import ('../views/NotFound.vue'),
            name: 'NotFound'
        },
        {
            path: '/add/payment/:category/',
            component: () =>
                import ('../components/AddPayment.vue'),
            name: 'ADDPAYMENT'
        }

    ]
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const getTitle = routName => {
    return {
        'dashboard': 'Take a look on your payments and add more!',
        'about': 'Anything about our awesome application!',
        'NotFound': 'Oops! Seems like we lost this page :('
    }[routName]
}

router.afterEach((to) => {
    document.title = getTitle(to.name)
})

export default router