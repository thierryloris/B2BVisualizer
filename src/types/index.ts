export interface CompanyData {
  entreprise: string
  localisation: string
  derniere_commande: string
  commandes: string
  montans: string
  recurrent: string
}

export interface CompanyRanking {
  entreprise: string
  montant: number
  recurrent: string
}

export type RecurrentStatus = 'Oui' | 'Non'

export interface CompanyStatistics {
  rankings: CompanyRanking[]
  recurringAverage: number
  nonRecurringAverage: number
  purchaseFrequency: number
}
