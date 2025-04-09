<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <CompaniesChart />
    </div>
    <CompanyStats />
  </div>
</template>

<script setup lang="ts">
import CompaniesChart from '@/components/charts/CompaniesChart.vue'
import CompanyStats from '@/components/charts/CompanyStats.vue'
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
