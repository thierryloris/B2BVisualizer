<template>
  <div class="company-stats">
    <!-- Classement des sociétés -->
    <StatCard title="Classement des Sociétés">
      <div class="rankings">
        <div v-if="!hasData" class="text-text-secondary text-center p-4">
          Upload a CSV file to see company rankings
        </div>
        <div
          v-else
          v-for="(ranking, index) in statistics.rankings"
          :key="index"
          class="ranking-item"
        >
          <span class="company-name">{{ ranking.entreprise }}</span>
          <StatValue :value="ranking.montant" format="currency" />
        </div>
      </div>
    </StatCard>

    <!-- Moyennes par type de client -->
    <StatCard title="Moyennes par Type de Client">
      <div class="averages">
        <div v-if="!hasData" class="text-text-secondary text-center p-4">
          Upload a CSV file to see averages
        </div>
        <template v-else>
          <div class="average-item">
            <div class="label">Clients Récurrents</div>
            <div class="value-container">
              <StatValue :value="statistics.recurringAverage" format="currency" size="large" />
            </div>
          </div>
          <div class="average-item">
            <div class="label">Clients Non Récurrents</div>
            <div class="value-container">
              <StatValue :value="statistics.nonRecurringAverage" format="currency" size="large" />
            </div>
          </div>
        </template>
      </div>
    </StatCard>

    <!-- Fréquence des achats -->
    <StatCard title="Fréquence Moyenne des Achats">
      <div class="frequency">
        <div v-if="!hasData" class="text-text-secondary text-center p-4">
          Upload a CSV file to see purchase frequency
        </div>
        <template v-else>
          <StatValue :value="statistics.purchaseFrequency" size="large" />
          <span class="unit">jours</span>
        </template>
      </div>
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCSVStore } from '@/stores/csvStore'
import StatCard from '@/components/common/StatCard.vue'
import StatValue from '@/components/common/StatValue.vue'
import type { CompanyStatistics } from '@/types'
import { calculateStatistics } from '@/utils/statistics'

const csvStore = useCSVStore()
const { csvData, hasData } = storeToRefs(csvStore)

const statistics = computed<CompanyStatistics>(() => {
  if (!hasData.value) {
    return {
      rankings: [],
      recurringAverage: 0,
      nonRecurringAverage: 0,
      purchaseFrequency: 0,
    }
  }

  return calculateStatistics(csvData.value)
})
</script>

<style scoped>
.company-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.rankings {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.rankings::-webkit-scrollbar {
  width: 6px;
}

.rankings::-webkit-scrollbar-track {
  background: var(--surface-color);
  border-radius: 3px;
}

.rankings::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}

.rankings::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color-hover);
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--surface-color);
  border-radius: 0.5rem;
}

.company-name {
  color: var(--text-primary);
}

.averages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.average-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: var(--text-secondary);
}

.value-container {
  text-align: right;
}

.frequency {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.unit {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
