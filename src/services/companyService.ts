import type { CompanyData, CompanyRanking, CompanyStatistics } from '@/types'
import { companiesData } from '@/data/companies'

export class CompanyService {
  private static parseCSV(csvText: string): CompanyData[] {
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',')

    return lines.slice(1).map((line) => {
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
      }
    })
  }

  private static calculateRankings(data: CompanyData[]): CompanyRanking[] {
    return data
      .map((company) => ({
        entreprise: company.entreprise,
        montant: parseInt(company.montans),
        recurrent: company.recurrent,
      }))
      .sort((a, b) => b.montant - a.montant)
  }

  private static calculateAverageByType(data: CompanyData[], isRecurrent: boolean): number {
    const filteredData = data.filter(
      (company) => company.recurrent === (isRecurrent ? 'Oui' : 'Non'),
    )
    const total = filteredData.reduce((sum, company) => sum + parseInt(company.montans), 0)
    return filteredData.length > 0 ? Math.round(total / filteredData.length) : 0
  }

  private static calculatePurchaseFrequency(data: CompanyData[]): number {
    const recurringCompanies = data.filter((company) => company.recurrent === 'Oui')
    if (recurringCompanies.length === 0) return 0

    const averageFrequencies = recurringCompanies
      .map((company) => {
        const dates = company.commandes
          .split(' ')
          .map((date) => new Date(date.split('/').reverse().join('-')))
          .sort((a, b) => b.getTime() - a.getTime())

        if (dates.length < 2) return 0

        const differences = []
        for (let i = 1; i < dates.length; i++) {
          const diffDays = (dates[i - 1].getTime() - dates[i].getTime()) / (1000 * 3600 * 24)
          differences.push(diffDays)
        }

        return differences.length > 0
          ? differences.reduce((sum, diff) => sum + diff, 0) / differences.length
          : 0
      })
      .filter((freq) => freq > 0)

    return averageFrequencies.length > 0
      ? Math.round(
          averageFrequencies.reduce((sum, freq) => sum + freq, 0) / averageFrequencies.length,
        )
      : 0
  }

  public static getStatistics(): CompanyStatistics {
    const data = this.parseCSV(companiesData)
    return {
      rankings: this.calculateRankings(data),
      recurringAverage: this.calculateAverageByType(data, true),
      nonRecurringAverage: this.calculateAverageByType(data, false),
      purchaseFrequency: this.calculatePurchaseFrequency(data),
    }
  }
}
