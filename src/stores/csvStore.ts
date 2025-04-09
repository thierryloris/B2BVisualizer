import { defineStore } from 'pinia'
import * as d3 from 'd3'

interface CSVRow {
  [key: string]: string
}

export const useCSVStore = defineStore('csv', {
  state: () => ({
    csvData: [] as CSVRow[],
    headers: [] as string[],
    error: '',
  }),

  actions: {
    setCSVData(data: CSVRow[]) {
      this.csvData = data
      if (data.length > 0) {
        this.headers = Object.keys(data[0])
      }
    },

    setError(message: string) {
      this.error = message
    },

    clearData() {
      this.csvData = []
      this.headers = []
      this.error = ''
    },

    async parseCSVFile(file: File) {
      return new Promise<void>((resolve) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          try {
            const text = e.target?.result as string
            const rows = d3.csvParse(text)

            if (rows.length > 0) {
              this.setCSVData(rows)
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

  getters: {
    getCSVData: (state) => state.csvData,
    getHeaders: (state) => state.headers,
    getError: (state) => state.error,
    hasData: (state) => state.csvData.length > 0,
  },
})
