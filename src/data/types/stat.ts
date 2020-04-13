import _ from 'lodash'

export enum Community {
    AN = "Andalucia",
    AR = "Aragón",
    AS = "Asturias",
    IB = "Islas Baleares",
    CN = "Islas Canarias",
    CB = "Cantabria",
    CM = "Castilla La Mancha",
    CL = "Castilla y León",
    CT = "Catalunya",
    CE = "Ceuta",
    VC = "Valencia",
    EX = "Extremadura",
    GA = "Galicia",
    MD = "Madrid",
    ML = "Melilla",
    MC = "Murcia",
    NC = "Navarra",
    PV = "Pais Vasco",
    RI = "La Rioja",
}

export const communitiesDict = _.zipObject(Object.keys(Community), Object.values(Community))

export type Stat = {
    community?: Community
    date: Date
    dateStr: string
    infected: number
    hospitalized: number
    intensiveHospitalized: number
    deaths: number
    recovered: number
}

export default Stat