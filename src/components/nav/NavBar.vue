<script setup lang="ts">
import config from '@/config';
import router from '@/router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

interface NavItem {
    title: string;
    route?: string;
    children: { title: string; route: string }[];
}

const navItems: NavItem[] = [
    {
        title: 'Formula 1',
        route: 'f1',
        children: [
            { title: 'Seasons', route: 'seasonIndex' },
            { title: 'Drivers', route: 'drivers' },
        ],
    },
    {
        title: 'Other',
        children: [
            { title: 'Snowflake', route: 'snowflake' },
            { title: 'Pdok', route: 'pdok' },
            { title: 'Dogs', route: 'dogs' },
            { title: 'Joke', route: 'joke' },
            { title: 'Morse', route: 'morse' },
            { title: 'Stopwatch', route: 'stopwatch' },
        ],
    },
];
</script>

<template>
    <nav
        class="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800"
    >
        <div class="mx-auto flex max-w-7xl items-center justify-between p-4">
            <div class="flex items-center gap-4">
                <RouterLink :to="{ name: 'home' }" class="group rounded-full">
                    <img
                        src="@/assets/avatar.jpeg"
                        class="size-10 rounded-full shadow-md group-hover:ring-1 group-hover:brightness-125"
                    />
                </RouterLink>

                <Menu
                    v-for="item of navItems"
                    :key="item.title"
                    as="div"
                    class="relative inline-block text-left"
                >
                    <MenuButton class="rounded-md p-2 hover:bg-gray-700">
                        {{ item.title }}
                    </MenuButton>

                    <MenuItems
                        class="absolute left-0 mt-2 min-w-32 overflow-hidden rounded-md dark:bg-gray-700"
                    >
                        <MenuItem
                            v-for="child of item.children"
                            :key="child.title"
                            as="div"
                            @click="router.push({ name: child.route })"
                            class="block cursor-pointer px-4 py-2 dark:hover:bg-gray-600"
                        >
                            {{ child.title }}
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>

            <a
                :href="config.repoUrl"
                class="rounded-md p-1 hover:bg-gray-700"
                target="_blank"
            >
                <FontAwesomeIcon :icon="['fab', 'github']" class="size-6" />
            </a>
        </div>
    </nav>
</template>
