import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from 'store/index'
Vue.use(Router)
const router = new Router({
    // mode: 'history',
    routes: [{
        
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/home',
            meta: {
                auth: false, // 是否需要登录
                keepAlive: false // 是否缓存组件
            },
            children: [{
                    path: '/home',
                    name: 'homeone',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/home/index.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },

                {
                    path: '/movie',
                    name: 'movie',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/home/movie.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },
                {
                    path: '/member',
                    name: 'member',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/member/index.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },
                {
                    path: '/message',
                    name: 'message',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/message/index.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },
                {
                    path: '/videoList',
                    name: 'videoList',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/videoList/index.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },
                {
                    path: '/playvideo',
                    name: 'playvideo',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/playvideo/index.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },
            ]
        },
        {
            path: '/appdown',
            name: 'appdown',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/appdown/index.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '/search',
            name: 'search',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/search/index.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },

        {
            path: '/myuser',
            name: 'myuser',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/my/myuser.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },   
        {
            path: '/videomy',
            name: 'videomy',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/videomy/index.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '/exchange',
            name: 'exchange',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/my/exchange.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },       
        {
            path: '/billboard',
            name: 'billboard',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/billboard/index.vue'),
            meta: {
                auth: false,
                keepAlive: false
            },
            children: [
                
                {
                    path: '/billmovie',
                    name: 'billmovie',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import( /* webpackChunkName: "about" */ './views/billboard/billmovie.vue'),
                    meta: {
                        auth: false,
                        keepAlive: false
                    }
                },  
            ]



        },     


        {
            path: '/my',
            name: 'my',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/my/index.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '/mission',
            name: 'mission',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/my/mission.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '/Invitation',
            name: 'Invitation',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/my/Invitation.vue'),
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '*', // 未匹配到路由时重定向
            redirect: '/home',
            meta: {
                // auth: true,
                // keepAlive: true
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];
    // 当跳转时携带指定方向参数则优先使用指定参数
    if (to.params.direction) {
        store.commit('updateDirection', to.params.direction)
    } else {
        const toIndex = history.getItem(to.path)
        const fromIndex = history.getItem(from.path)
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
            if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                store.commit('updateDirection', 'forward')
            } else {
                store.commit('updateDirection', 'back')
            }
        } else {
            ++historyCount
            history.setItem('count', historyCount)
            to.path !== '/' && history.setItem(to.path, historyCount)
            store.commit('updateDirection', 'forward')
        }
    }
    if (auth) { // 需要登录
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})
export default router
