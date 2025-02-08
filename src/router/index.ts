import DriverShow from '@/views/DriverShow.vue';
import DriversIndex from '@/views/DriversIndex.vue';
import HomeView from '@/views/HomeView.vue';
import PdokView from '@/views/PdokView.vue';
import SnowflakeView from '@/views/SnowflakeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/snowflake',
            name: 'snowflake',
            component: SnowflakeView,
        },
        {
            path: '/pdok',
            name: 'pdok',
            component: PdokView,
        },
        {
            path: '/f1',
            children: [
                {
                    path: 'drivers',
                    children: [
                        {
                            path: '',
                            name: 'drivers',
                            component: DriversIndex,
                            props: (route) => ({
                                season: Number(route.query.season) || undefined,
                            }),
                        },
                        {
                            path: ':id',
                            name: 'driverShow',
                            component: DriverShow,
                            props: true,
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;
