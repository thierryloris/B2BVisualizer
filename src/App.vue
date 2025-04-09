<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import '@/assets/theme.css'
import '@/assets/main.css'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <h1 class="app-title">B2B Visualizer</h1>
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  background-color: var(--background-primary);
}

.header {
  background-color: var(--background-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
  background-color: var(--card-background);
}

.nav-link.router-link-active {
  color: var(--text-primary);
  background-color: var(--card-background);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
