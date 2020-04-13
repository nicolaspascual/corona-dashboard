import React from 'react'
import Stat from '../data/types/stat'

const statsContext = React.createContext<Stat[]>([])

export default statsContext