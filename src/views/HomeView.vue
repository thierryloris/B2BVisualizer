<template>
  <div class="dashboard">
    <CSVUploader />
    <div v-if="hasData">
      <div class="dashboard-grid mb-4">
        <CompaniesChart />
      </div>
      <CompanyStats />
    </div>
  </div>
</template>

<script setup lang="ts">
import CompaniesChart from '@/components/charts/CompaniesChart.vue'
import CompanyStats from '@/components/charts/CompanyStats.vue'
import CSVUploader from '@/components/CSVUploader.vue'
import { useCSVStore } from '@/stores/csvStore'
import { storeToRefs } from 'pinia'
const csvStore = useCSVStore()
const { hasData } = storeToRefs(csvStore)
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
