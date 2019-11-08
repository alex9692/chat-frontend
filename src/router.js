import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('./views/Home.vue')
		},
		{
			path: '/enter-room',
			component: () => import('./views/EnterRoom.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isAuth) {
					next();
				} else {
					next('/');
				}
			}
		},
		{
			path: '/create-room',
			component: () => import('./views/CreateRoom.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isAuth) {
					next();
				} else {
					next('/');
				}
			}
		},
		{
			path: '/sign-up',
			component: () => import('./views/SignUp.vue'),
			beforeEnter: (to, from, next) => {
				if (!store.state.isAuth) {
					next();
				} else {
					next('/');
				}
			}
		},
		{
			path: '/sign-in',
			component: () => import('./views/SignIn.vue'),
			beforeEnter: (to, from, next) => {
				if (!store.state.isAuth) {
					next();
				} else {
					next('/');
				}
			}
		},
		{
			path: '/room/:id',
			component: () => import('./views/ChatRoom.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isAuth) {
					next();
				} else {
					next('/');
				}
			}
		}
	]
});

export default router;
