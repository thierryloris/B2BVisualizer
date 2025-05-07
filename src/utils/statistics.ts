import type { CompanyData, CompanyRanking, CompanyStatistics } from '@/types'

export const calculateRankings = (data: CompanyData[]): CompanyRanking[] => {
  return data
    .map((item) => ({
      entreprise: item.entreprise,
      montant: parseFloat(item.montans || '0'),
      recurrent: item.recurrent,
    }))
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 10)
}

export const calculateAverages = (data: CompanyData[]) => {
  const recurringClients = data.filter((item) => item.recurrent === 'Oui')
  const nonRecurringClients = data.filter((item) => item.recurrent === 'Non')

  const recurringAverage =
    recurringClients.reduce((sum, item) => sum + parseFloat(item.montans || '0'), 0) /
    (recurringClients.length || 1)

  const nonRecurringAverage =
    nonRecurringClients.reduce((sum, item) => sum + parseFloat(item.montans || '0'), 0) /
    (nonRecurringClients.length || 1)

  return { recurringAverage, nonRecurringAverage }
}

export const calculatePurchaseFrequency = (data: CompanyData[]): number => {
  const recurringCompanies = data.filter((item) => item.recurrent === 'Oui')
  console.log('Recurring companies:', recurringCompanies)
  if (recurringCompanies.length === 0) return 0

  const averageFrequencies = recurringCompanies
    .map((company) => {
      console.log('Processing company:', company.entreprise)
      console.log('Commandes string:', company.commandes)

      const dates = company.commandes
        .replace(/'/g, '') // Remove single quotes
        .split(' ')
        .map((date) => {
          console.log('Processing date:', date)
          // Parse DD/MM/YYYY format correctly
          const [day, month, year] = date.split('/').map((num) => parseInt(num, 10))
          if (isNaN(day) || isNaN(month) || isNaN(year)) {
            console.log('Invalid date parts:', { day, month, year })
            return null
          }
          const parsedDate = new Date(year, month - 1, day)
          console.log('Parsed date:', parsedDate)
          return parsedDate
        })
        .filter((date): date is Date => date !== null && !isNaN(date.getTime())) // Filter out invalid dates
        .sort((a, b) => b.getTime() - a.getTime())

      console.log('Sorted dates:', dates)

      if (dates.length < 2) {
        console.log('Not enough dates for company:', company.entreprise)
        return 0
      }

      const differences = []
      for (let i = 1; i < dates.length; i++) {
        const diffTime = Math.abs(dates[i - 1].getTime() - dates[i].getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        console.log('Days difference:', diffDays)
        differences.push(diffDays)
      }

      const avgFreq =
        differences.length > 0
          ? differences.reduce((sum, diff) => sum + diff, 0) / differences.length
          : 0
      console.log('Average frequency for company:', avgFreq)
      return avgFreq
    })
    .filter((freq) => freq > 0)

  console.log('All average frequencies:', averageFrequencies)

  const finalFreq =
    averageFrequencies.length > 0
      ? Math.round(
          averageFrequencies.reduce((sum, freq) => sum + freq, 0) / averageFrequencies.length,
        )
      : 0
  console.log('Final frequency:', finalFreq)
  return finalFreq
}

export const calculateStatistics = (data: CompanyData[]): CompanyStatistics => {
  if (!data.length) {
    return {
      rankings: [],
      recurringAverage: 0,
      nonRecurringAverage: 0,
      purchaseFrequency: 0,
    }
  }

  const rankings = calculateRankings(data)
  const { recurringAverage, nonRecurringAverage } = calculateAverages(data)
  const purchaseFrequency = calculatePurchaseFrequency(data)

  return {
    rankings,
    recurringAverage,
    nonRecurringAverage,
    purchaseFrequency,
  }
}
