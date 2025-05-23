export const companiesData = `entreprise,localisation,derniere_commande,commandes,montans,recurrent
7Bis,75011,01/04/2025,'01/03/2025 01/02/2025 01/03/2025',10000,Oui
TechVision,69002,15/03/2025,'15/02/2025 15/01/2025 15/12/2024',15750,Oui
DataFlow,33000,22/03/2025,'22/02/2025 22/01/2025 22/12/2024',8500,Non
SmartSolutions,13008,05/04/2025,'05/03/2025 05/02/2025 05/01/2025',12300,Oui
EcoInnovate,44000,28/03/2025,'28/02/2025 28/01/2025 28/12/2024',9800,Non
DigitalPro,92100,10/04/2025,'10/03/2025 10/02/2025 10/01/2025',23500,Oui
GreenTech,31000,18/03/2025,'18/02/2025 18/01/2025 18/12/2024',17800,Non
ByteCraft,59000,25/03/2025,'25/02/2025 25/01/2025 25/12/2024',14200,Oui
CloudNine,06000,12/04/2025,'12/03/2025 12/02/2025 12/01/2025',19900,Oui
InnoSys,67000,20/03/2025,'20/02/2025 20/01/2025 20/12/2024',11600,Non
WebMatrix,35000,08/04/2025,'08/03/2025 08/02/2025 08/01/2025',16400,Oui
DataSphere,13100,15/04/2025,'15/03/2025 15/02/2025 15/01/2025',21300,Oui
TechFlow,69003,02/04/2025,'02/03/2025 02/02/2025 02/01/2025',13700,Non
SmartNet,75016,30/03/2025,'30/02/2025 30/01/2025 30/12/2024',18200,Oui
CodeCraft,44200,07/04/2025,'07/03/2025 07/02/2025 07/01/2025',15900,Non`

export interface CompanyData {
  entreprise: string
  localisation: string
  derniere_commande: string
  commandes: string
  montans: string
  recurrent: string
}

export const parseCSV = (csvText: string): CompanyData[] => {
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
