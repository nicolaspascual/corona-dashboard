import Stat, { Community } from './types/stat'
import moment from 'moment'

async function responseToStats(response: Response): Promise<[Stat[], Stat[]]> {
    const rawStats = await response.text()
    const stats = rawStats.split('\n')
        .filter(line => /[A-Z]{2},/.test(line))
        .map(line => line.split(','))
        .map(sl => {
            const [rawCommunity, rawDate, rawInfected, rawHospitalized, rawIntensiveHospitalized, rawDeaths, rawRecovered] = sl
            const date = moment(rawDate, 'DD/MM/YYYY').toDate()
            const dateStr = moment(rawDate, 'DD/MM/YYYY').format()
            const infected = Number(rawInfected)
            const hospitalized = Number(rawHospitalized)
            const intensiveHospitalized = Number(rawIntensiveHospitalized)
            const deaths = Number(rawDeaths)
            const recovered = Number(rawRecovered)
            const community = (rawCommunity as unknown) as Community
            return {
                community, date, dateStr, infected, hospitalized, intensiveHospitalized, deaths, recovered
            }
        })
        debugger

    const aggregatedStats = Array.from(
        stats.reduce(function (agg, stat) {
            let currAgg = agg.get(stat.dateStr);
            if (!!currAgg) {
                currAgg = {
                    date: stat.date,
                    dateStr: stat.dateStr,
                    infected: currAgg.infected + stat.infected,
                    hospitalized: currAgg.hospitalized + stat.hospitalized,
                    intensiveHospitalized: currAgg.intensiveHospitalized + stat.intensiveHospitalized,
                    deaths: currAgg.deaths + stat.deaths,
                    recovered: currAgg.recovered + stat.recovered,
                }
            } else {
                currAgg = Object.assign({}, stat)
            }
            return agg.set(stat.dateStr, currAgg);
        }, new Map<string, Stat>()).values())

    return [stats, aggregatedStats]
}

export async function downloadStats(): Promise<[Stat[], Stat[]]> {
    const rawData = await fetch(`${process.env.PUBLIC_URL}/data/dada.csv`)
    return responseToStats(rawData)
}