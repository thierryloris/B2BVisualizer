<template>
  <div class="card stat-card">
    <span class="stat-label">Client Retention</span>
    <div class="chart-container">
      <Doughnut v-if="hasData" :data="chartData" :options="chartOptions" />
      <div v-else class="text-text-secondary text-center p-4">
        Upload a CSV file to see the chart
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCSVStore } from '@/stores/csvStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const csvStore = useCSVStore()
const { csvData, hasData } = storeToRefs(csvStore)

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<'doughnut'>) {
          const label = context.label || ''
          const value = (context.raw as number) || 0
          const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${percentage}% (${value} clients)`
        },
      },
    },
  },
}

const chartData = computed<ChartData<'doughnut'>>(() => {
  if (!hasData.value) {
    return {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
    }
  }

  const recurring = csvData.value.filter((item) => item.recurrent === 'Oui').length
  const nonRecurring = csvData.value.filter((item) => item.recurrent === 'Non').length

  return {
    labels: ['Clients Récurrents', 'Clients Non Récurrents'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651'],
        data: [recurring, nonRecurring],
      },
    ],
  }
})
</script>
