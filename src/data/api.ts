import Stat from './types/stat'

async function responseToStats(response: Response): Promise<Stat[]> {
    const txt = await response.text()
    debugger
    return [
        {
            CCAA: '', CASOS: 1, FECHA: new Date(), Fallecidos: 1, Hospitalizados: 1, Recuperados: 1, UCI: 1
        }
    ]
}

export async function downloadStats(): Promise<Stat[]> {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://covid19.isciii.es/resources/serie_historica_acumulados.csv')
    return responseToStats(response)
}