<script setup lang="ts">
interface NavItem {
    title: string
    route?: string
    children: { title: string; route: string }[]
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
]
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
                <!-- Nav -->
                <div class="flex h-10 items-center gap-4 py-6">
                    <div
                        v-for="item of navItems"
                        :key="item.title"
                        class="group relative rounded-md p-2 hover:bg-gray-700"
                    >
                        <RouterLink v-if="item.route" :to="{ name: item.route }">
                            {{ item.title }}
                        </RouterLink>
                        <template v-else>
                            {{ item.title }}
                        </template>
                        <div
                            v-if="item.children.length"
                            class="absolute left-0 mt-2 hidden min-w-full rounded-md bg-gray-700 py-2 group-hover:grid"
                        >
                            <RouterLink
                                v-for="child of item.children"
                                :key="child.title"
                                :to="{ name: child.route }"
                                class="px-4 py-2 hover:bg-gray-600"
                            >
                                {{ child.title }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
