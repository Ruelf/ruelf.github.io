<script setup lang="ts">
interface NavItem {
    title: string
    children: { title: string; route: string }[]
}

const navItems: NavItem[] = [
    {
        title: 'Formula 1',
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
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div class="p-4 max-w-7xl mx-auto">
            <div class="flex items-center gap-4">
                <RouterLink
                    :to="{ name: 'home' }"
                    class="group"
                >
                    <img
                        src="@/assets/avatar.jpeg"
                        class="size-10 rounded-full shadow-md group-hover:brightness-125 group-hover:ring-1"
                    />
                </RouterLink>
                <!-- Nav -->
                <div class="flex items-center gap-4 h-10 py-6">
                    <div
                        v-for="item of navItems"
                        :key="item.title"
                        class="group relative p-2 hover:bg-gray-700 rounded-md"
                    >
                        {{ item.title }}
                        <div
                            v-if="item.children.length"
                            class="hidden group-hover:grid mt-2 absolute left-0 min-w-full bg-gray-700 py-2 rounded-md"
                        >
                            <RouterLink
                                v-for="child of item.children"
                                :key="child.title"
                                :to="{ name: child.route }"
                                class="py-2 px-4 hover:bg-gray-600"
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
