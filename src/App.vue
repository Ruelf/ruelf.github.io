<script setup lang="ts">
import Container from './components/Container.vue'
import NavBar from './components/nav/NavBar.vue'
</script>

<template>
    <div class="text-black dark:text-gray-100">
        <header>
            <NavBar />
        </header>
        <main>
            <Container>
                <RouterView />
            </Container>
        </main>
    </div>
</template>
