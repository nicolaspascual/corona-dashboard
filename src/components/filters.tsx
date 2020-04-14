import React from 'react'
import IFilters from '../data/types/filters'
import { MultiCascader, DateRangePicker } from 'rsuite'
import { communitiesDict } from '../data/types/stat'

type Props = {
    filters: IFilters,
    handleChange: (f: IFilters) => void
}

const linesToShowOptions = [
    { label: 'Infected', value: 'infected' },
    { label: 'Hospitalized', value: 'hospitalized' },
    { label: 'Intensive Hospitalized', value: 'intensiveHospitalized' },
    { label: 'Deaths', value: 'deaths' },
    { label: 'Recovered', value: 'recovered' },
]

function Filters({ filters, handleChange }: Props) {
    const communities = Object.entries(communitiesDict).map(e => ({ label: e[1], value: e[0] }))

    const handleChangeCommunities = (communities: any[]) => {
        handleChange({
            ...filters,
            communities: communities
        })
    }

    const handleChangeDate = (dates: any[]) => {
        handleChange({
            ...filters,
            from: dates[0],
            to: dates[1]
        })
    }

    const handleChangeLines = (lines: any[]) => {
        const empty = lines.every(e => !e)
        handleChange({
            ...filters,
            linesToShow: {
                deaths: empty || lines.includes('deaths'),
                recovered: empty || lines.includes('recovered'),
                hospitalized: empty || lines.includes('hospitalized'),
                infected: empty || lines.includes('infected'),
                intensiveHospitalized: empty || lines.includes('intensiveHospitalized'),
            }
        })
    }

    const linesToShow = Object.values(filters.linesToShow).every(e => e === true) ? [] : [
        filters.linesToShow.hospitalized && 'hospitalized',
        filters.linesToShow.deaths && 'deaths',
        filters.linesToShow.infected && 'infected',
        filters.linesToShow.recovered && 'recovered',
        filters.linesToShow.intensiveHospitalized && 'intensiveHospitalized',
    ]

    return (
        <>
            <MultiCascader cascade={false} data={communities} value={filters.communities} onChange={handleChangeCommunities} searchable={false}/>
            <span style={{marginRight: '5px'}}/>
            <DateRangePicker value={[filters.from, filters.to]} onChange={handleChangeDate} />
            <span style={{marginRight: '5px'}}/>
            <MultiCascader cascade={false} data={linesToShowOptions} value={linesToShow} onChange={handleChangeLines} searchable={false}/>
        </>
    )
}

export default Filters