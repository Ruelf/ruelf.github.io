import DriverShow from '@/views/DriverShow.vue';
import DriversView from '@/views/DriversView.vue';
import F1View from '@/views/F1View.vue';
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
            name: 'f1',
            component: F1View,
            children: [
                {
                    path: 'drivers',
                    name: 'drivers',
                    component: DriversView,
                },
                {
                    path: 'drivers/:id',
                    name: 'driverShow',
                    component: DriverShow,
                    props: true,
                },
            ],
        },
    ],
});

export default router;
