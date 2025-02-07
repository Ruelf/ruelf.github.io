<script setup lang="ts">
import router from '@/router';
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
        children: [{ title: 'Drivers', route: 'drivers' }],
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Snowflake',
                route: 'snowflake',
            },
            {
                title: 'Pdok',
                route: 'pdok',
            },
        ],
    },
];
</script>

<template>
    <nav class="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl p-4">
            <div class="flex items-center gap-4">
                <RouterLink :to="{ name: 'home' }" class="group">
                    <img
                        src="@/assets/avatar.jpeg"
                        class="size-10 rounded-full shadow-md group-hover:ring-1 group-hover:brightness-125"
                    />
                </RouterLink>

                <Menu v-for="item of navItems" :key="item.title" as="div" class="relative inline-block text-left">
                    <MenuButton class="rounded-md p-2 hover:bg-gray-700">
                        {{ item.title }}
                    </MenuButton>

                    <MenuItems class="absolute left-0 mt-2 min-w-32 overflow-hidden rounded-md dark:bg-gray-700">
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
        </div>
    </nav>
</template>
