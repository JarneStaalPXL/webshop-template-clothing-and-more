import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/category/:maincategory/:category',
        name: 'CategoryProductsView',
        component: () => import('../views/CategoryProductsView.vue'),
    },
    {
        path: '/product/:id',
        name: 'ProductDetailView',
        component: () => import('../views/ProductDetailView.vue'),
    },
    {
        path: '/cart',
        name: 'CartView',
        component: () => import('../views/CartView.vue'),
        props: true, 
    },
    {
        path: '/login',
        name: 'SignInView',
        component: () => import('../views/SignInView.vue')
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import('../views/RegisterView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundView',
        component: () => import('../views/NotFoundView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // If savedPosition is available, return it, meaning the user is going back
            return savedPosition;
        } else {
            // If there is no savedPosition, the user is navigating forward, scroll to top
            return { top: 0 };
        }
    },
});

export default router;
