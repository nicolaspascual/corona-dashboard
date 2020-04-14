import React, { useContext } from 'react'
import Stat, { communitiesDict } from '../data/types/stat'
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { Panel } from 'rsuite'
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


export function CommunityStat({ stats, label, linesToShow, height }: { stats: Stat[], label: string, height?: string } & Props) {
    let lineProps: Partial<Line['props']> = { type: 'monotone', dot: false, animationDuration: 750}
    return (
        <Panel header={label} bordered shaded bodyFill defaultExpanded style={{ direction: 'ltr', margin: '10px 5px', backgroundColor: 'white', flexShrink: 0 }}>
            <div style={{ height: height, padding: '0 20px'}}>
                <ResponsiveContainer>
                    <LineChart syncId="communitiesChart" data={stats} >
                        <XAxis dataKey="dateStr" tickFormatter={d => moment(d).format('DD/MM')}/>
                        <YAxis tickFormatter={v => `${Math.floor(v / 1000)}k`} width={30}/>
                        <Tooltip labelFormatter={d => moment(d).format('DD/MM/YY')}/>

                        {linesToShow.infected && <Line {...lineProps} dataKey="infected" />}
                        {linesToShow.hospitalized && <Line {...lineProps} dataKey="hospitalized" />}
                        {linesToShow.intensiveHospitalized && <Line {...lineProps} dataKey="intensiveHospitalized" />}
                        {linesToShow.deaths && <Line {...lineProps} dataKey="deaths" />}
                        {linesToShow.recovered && <Line {...lineProps} dataKey="recovered" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Panel>
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