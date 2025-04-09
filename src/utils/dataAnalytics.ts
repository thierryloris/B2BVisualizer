import type { CompanyData } from './csvLoader'

export interface CompanyRanking {
  entreprise: string
  montant: number
  recurrent: string
}

export const calculateCompanyRankings = (data: CompanyData[]): CompanyRanking[] => {
  return data
    .map((company) => ({
      entreprise: company.entreprise,
      montant: parseInt(company.montans),
      recurrent: company.recurrent,
    }))
    .sort((a, b) => b.montant - a.montant)
}

export const calculateAverageByType = (data: CompanyData[], isRecurrent: boolean): number => {
  const filteredData = data.filter((company) => company.recurrent === (isRecurrent ? 'Oui' : 'Non'))
  const total = filteredData.reduce((sum, company) => sum + parseInt(company.montans), 0)
  return filteredData.length > 0 ? Math.round(total / filteredData.length) : 0
}

export const calculatePurchaseFrequency = (data: CompanyData[]): number => {
  const recurringCompanies = data.filter((company) => company.recurrent === 'Oui')

  const averageFrequencies = recurringCompanies.map((company) => {
    const dates = company.commandes
      .split(' ')
      .map((date) => new Date(date.split('/').reverse().join('-')))
      .sort((a, b) => b.getTime() - a.getTime())

    const differences = []
    for (let i = 1; i < dates.length; i++) {
      const diffDays = (dates[i - 1].getTime() - dates[i].getTime()) / (1000 * 3600 * 24)
      differences.push(diffDays)
    }

    return differences.reduce((sum, diff) => sum + diff, 0) / differences.length
  })

  return Math.round(
    averageFrequencies.reduce((sum, freq) => sum + freq, 0) / averageFrequencies.length,
  )
}
