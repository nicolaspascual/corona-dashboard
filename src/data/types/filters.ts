import { Community } from '../types/stat'

export type Filters = {
    from?: Date
    to?: Date
    communities: string[],
    linesToShow: {
        infected: boolean
        hospitalized: boolean
        intensiveHospitalized: boolean
        deaths: boolean
        recovered: boolean
    }
}

export default Filters