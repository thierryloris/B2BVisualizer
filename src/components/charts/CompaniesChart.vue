<template>
  <div class="card stat-card">
    <span class="stat-label">Client Retention</span>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
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
import { ref, onMounted } from 'vue'
import { companiesData, parseCSV, type CompanyData } from '@/utils/csvLoader'

ChartJS.register(ArcElement, Tooltip, Legend)

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

const processData = (data: CompanyData[]) => {
  const recurring = data.filter((item) => item.recurrent === 'Oui').length
  const nonRecurring = data.filter((item) => item.recurrent === 'Non').length

  return {
    labels: ['Clients Récurrents', 'Clients Non Récurrents'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651'],
        data: [recurring, nonRecurring],
      },
    ],
  }
}

const chartData = ref<ChartData<'doughnut'>>({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
})

onMounted(() => {
  try {
    const data = parseCSV(companiesData)
    chartData.value = processData(data)
  } catch (error) {
    console.error('Error processing CSV data:', error)
  }
})
</script>
