import { defineStore } from 'pinia'
import type { CompanyData } from '@/types'

export const useCSVStore = defineStore('csv', {
  state: () => ({
    csvData: [] as CompanyData[],
    error: '',
  }),
  getters: {
    hasData: (state) => state.csvData.length > 0,
  },
  actions: {
    setCSVData(data: string) {
      const lines = data.trim().split('\n')
      const headers = lines[0].split(',')

      this.csvData = lines.slice(1).map((line) => {
        const values = line.split(',')
        const record: Record<string, string> = {}
        headers.forEach((header, index) => {
          let value = values[index] || ''
          if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1)
          }
          record[header] = value.trim()
        })

        return {
          entreprise: record['entreprise'],
          localisation: record['localisation'],
          derniere_commande: record['derniere_commande'],
          commandes: record['commandes'],
          montans: record['montans'],
          recurrent: record['recurrent'],
        } as CompanyData
      })
    },

    setError(message: string) {
      this.error = message
    },

    clearData() {
      this.csvData = []
      this.error = ''
    },

    async parseCSVFile(file: File) {
      return new Promise<void>((resolve) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          try {
            const text = e.target?.result as string
            if (text) {
              this.setCSVData(text)
              this.error = ''
            } else {
              this.setError('No data found in CSV file')
            }
          } catch (err) {
            this.setError('Error parsing CSV file')
            console.error(err)
          }
          resolve()
        }

        reader.onerror = () => {
          this.setError('Error reading file')
          resolve()
        }

        reader.readAsText(file)
      })
    },
  },
})
