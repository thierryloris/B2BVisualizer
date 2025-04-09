<template>
  <div class="bg-background-secondary rounded-xl p-6 shadow-md mb-8">
    <div>
      <div class="text-text-secondary text-xl mb-4">Import CSV to start</div>
      <label
        for="csv-file"
        class="inline-block px-6 py-3 bg-accent text-white rounded-lg cursor-pointer transition-colors hover:bg-accent/80"
      >
        <span>Choose CSV file</span>
        <input id="csv-file" type="file" accept=".csv" @change="handleFileUpload" class="hidden" />
      </label>
      <div v-if="error" class="mt-2 text-danger text-sm">{{ error }}</div>
    </div>

    <div v-if="hasData" class="mt-6">
      <h3 class="text-xl font-semibold text-white mb-4">CSV Data Preview</h3>
      <div class="bg-background-secondary rounded-xl shadow-md overflow-x-auto max-h-[400px]">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header"
                class="px-4 py-3 text-left text-white font-semibold sticky top-0 bg-background-secondary border-b border-border"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in csvData.slice(0, 10)"
              :key="index"
              class="hover:bg-card-background"
            >
              <td
                v-for="(value, key) in row"
                :key="key"
                class="px-4 py-3 text-text-secondary border-b border-border hover:text-white"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCSVStore } from '@/stores/csvStore'

const csvStore = useCSVStore()
const { csvData, headers, error, hasData } = storeToRefs(csvStore)

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  await csvStore.parseCSVFile(file)
}
</script>

<style scoped>
.csv-uploader {
  margin-bottom: 2rem;
}

.file-label {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: var(--text-primary);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.file-label:hover {
  background-color: color-mix(in srgb, var(--accent-color) 80%, white);
}

.file-input {
  display: none;
}

.error-message {
  margin-top: 0.5rem;
  color: var(--danger-color);
  font-size: 0.875rem;
}

.section-title {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
  max-height: 400px;
  background-color: var(--background-secondary);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: var(--background-secondary);
  color: var(--text-primary);
  font-weight: 600;
  position: sticky;
  top: 0;
}

td {
  color: var(--text-secondary);
}

tr:hover td {
  color: var(--text-primary);
  background-color: var(--card-background);
}
</style>
