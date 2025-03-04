import DriverShow from '@/views/f1/drivers/DriverShow.vue';
import DriverIndex from '@/views/f1/drivers/DriverIndex.vue';
import HomeView from '@/views/HomeView.vue';
import PdokView from '@/views/PdokView.vue';
import SnowflakeView from '@/views/SnowflakeView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SeasonIndex from '@/views/f1/seasons/SeasonIndex.vue';
import SeasonShow from '@/views/f1/seasons/SeasonShow.vue';
import SeasonHome from '@/views/f1/seasons/SeasonHome.vue';
import SeasonDrivers from '@/views/f1/seasons/SeasonDrivers.vue';
import DogsView from '@/views/DogsView.vue';
import JokeView from '@/views/JokeView.vue';
import JokeInfo from '@/views/JokeInfo.vue';
import TestView from '@/views/TestView.vue';
import MorseView from '@/views/MorseView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/test',
            name: 'test',
            component: TestView,
        },
        {
            path: '/morse',
            name: 'morse',
            component: MorseView,
        },
        {
            path: '/snowflake',
            name: 'snowflake',
            component: SnowflakeView,
        },
        {
            path: '/dogs',
            name: 'dogs',
            component: DogsView,
        },
        {
            path: '/pdok',
            name: 'pdok',
            component: PdokView,
        },
        {
            path: '/joke',
            name: 'joke',
            component: JokeView,
        },
        {
            path: '/joke/info',
            name: 'jokeInfo',
            component: JokeInfo,
        },
        {
            path: '/f1',
            children: [
                {
                    path: 'seasons',
                    children: [
                        {
                            path: '',
                            name: 'seasonIndex',
                            component: SeasonIndex,
                        },
                        {
                            path: ':season',
                            component: SeasonShow,
                            props: (route) => ({
                                season:
                                    Number(route.params.season) || undefined,
                            }),
                            children: [
                                {
                                    path: '',
                                    name: 'seasonHome',
                                    props: (route) => ({
                                        season:
                                            Number(route.params.season) ||
                                            undefined,
                                    }),
                                    component: SeasonHome,
                                },
                                {
                                    path: 'drivers',
                                    name: 'seasonDrivers',
                                    props: (route) => ({
                                        season:
                                            Number(route.params.season) ||
                                            undefined,
                                    }),
                                    component: SeasonDrivers,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'drivers',
                    children: [
                        {
                            path: '',
                            name: 'drivers',
                            component: DriverIndex,
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
