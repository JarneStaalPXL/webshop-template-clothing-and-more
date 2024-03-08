import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

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
        path: '/products',
        name: 'FilteredProductsView',
        component: () => import('../views/FilteredProductsView.vue'),
        
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
        path: '/checkout',
        name: 'CheckoutView',
        component: () => import('../views/CheckoutView.vue'),
    },
    {
        path: '/checkout/afterPaymentRedirect/',
        query: { sessionId: 'session_id', orderNumberId: 'order_id'},
        name: 'RedirectAfterPaymentView',
        component: () => import('../views/RedirectAfterPaymentView.vue'),
    },
    {
        path: '/checkout/success',
        name: 'CheckoutSuccessView',
        query: { sessionId: 'session_id', orderNumberId: 'order_id'},
        component: () => import('../views/CheckoutSuccessView.vue'),
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
        path: '/account/orders',
        name: 'AccountView',
        component: () => import('../views/AccountView.vue'),
        beforeRouteEnter (to, from, next) {
            if(store.state.isLoggedIn && store.state.user) {
                next();
            }
            else {
                next({name: 'SignInView'});
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundView',
        component: () => import('../views/NotFoundView.vue'),
    },
    {
        path: '/admin',
        name: 'AdminView',
        component: () => import('../views/AdminView.vue'),
    }
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

router.beforeEach((to, from, next) => {
    store.commit("SET_SHOW_NAVIGATION_COMPONENT", true);
    store.commit("SET_SHOW_FOOTER_COMPONENT", true);
    next();
});

export default router;
