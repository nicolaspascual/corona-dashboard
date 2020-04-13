import React, { useEffect, useState } from 'react';
import './App.css';
import { downloadStats } from './data/api';
import { Stat } from './data/types/stat';
import statsContext from './contexts/statContext'
import Filters from './components/filters'
import IFilters from './data/types/filters'
import CommunitiesStats, { CommunityStat } from './components/communitiesStats';

function App() {

  const [stats, setStats] = useState<Stat[]>([])
  const [aggregatedStats, setAggregatedStats] = useState<Stat[]>([])
  const [originalStats, setOriginalStats] = useState<Stat[]>([])
  const [filters, setFilters] = useState<IFilters>({
    from: undefined,
    to: undefined,
    communities: ["MD"],
    linesToShow: { deaths: true, recovered: true, hospitalized: true, infected: true, intensiveHospitalized: true }
  })

  const filterStats = (): void => {
    const filteredStats = originalStats
      .filter(s => filters.from ? s.date >= filters.from : true)
      .filter(s => filters.to ? s.date <= filters.to : true)
      .filter(s => filters.communities.length > 0 ? filters.communities.includes(s.community || '') : true)
    setStats(filteredStats)
  }

  const handleFilterChange = (filters: IFilters): void => {
    setFilters(filters)
  }

  useEffect(filterStats, [filters, originalStats])

  useEffect(() => {
    downloadStats().then(([stats, aggregatedStats]) => {
      setOriginalStats(stats)
      setAggregatedStats(aggregatedStats)
    })
  }, [])

  return (
    <statsContext.Provider value={stats}>
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <Filters filters={filters} handleChange={handleFilterChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 50px)' }}>
          <div style={{ flexBasis: '35%', height: '100%' }}>
            <CommunitiesStats linesToShow={filters.linesToShow} />
          </div>
          <div style={{ flexGrow: 1, height: 'calc(100% - 50px)'}}>
            <CommunityStat
              stats={aggregatedStats}
              label="All"
              linesToShow={filters.linesToShow}
            />
          </div>
        </div>
      </div>
    </statsContext.Provider>
  );
}

export default App;
