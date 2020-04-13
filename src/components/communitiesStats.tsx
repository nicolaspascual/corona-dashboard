import React, { useContext } from 'react'
import Stat, { communitiesDict } from '../data/types/stat'
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import StatContext from '../contexts/statContext'

type Props = {
    linesToShow: {
        infected: boolean
        hospitalized: boolean
        intensiveHospitalized: boolean
        deaths: boolean
        recovered: boolean
    }
}

export function CommunityStat({ stats, label, linesToShow, height }: { stats: Stat[], label: string, height?: string} & Props) {
    return (
        <div style={{ backgroundColor: '#CDE6F5', borderRadius: '25px', padding: '10px', margin: '25px', direction: 'ltr', height: height || '100%' }}>
            <h4>{label}</h4>
            <ResponsiveContainer>
                <LineChart
                    syncId="communitiesChart"
                    data={stats}
                    margin={{
                        top: 25, right: 25, left: 25, bottom: 25,
                    }}
                >
                    <XAxis dataKey="dateStr" tickFormatter={d => moment(d).format('DD')} />
                    <YAxis />
                    <Tooltip />
                    {linesToShow.infected && <Line type="monotone" dataKey="infected" />}
                    {linesToShow.hospitalized && <Line type="monotone" dataKey="hospitalized" />}
                    {linesToShow.intensiveHospitalized && <Line type="monotone" dataKey="intensiveHospitalized" />}
                    {linesToShow.deaths && <Line type="monotone" dataKey="deaths" />}
                    {linesToShow.recovered && <Line type="monotone" dataKey="recovered" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export function CommunitiesStats({ linesToShow }: Props) {
    const stats = useContext(StatContext)
    const communities = Array.from(new Set(stats.map(s => s.community)))
    return (
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: '100%', direction: 'rtl' }}>
            {communities.map((community, idx) => (
                <CommunityStat
                    linesToShow={linesToShow}
                    label={communitiesDict[community || ''] || ''}
                    key={idx}
                    stats={stats.filter(s => s.community === community)}
                    height="200px"
                />
            ))}
        </div>
    )
}

CommunitiesStats.defaultProps = {
    linesToShow: {
        infected: true,
        hospitalized: true,
        intensiveHospitalized: true,
        deaths: true,
        recovered: true,
    }
}

export default CommunitiesStats