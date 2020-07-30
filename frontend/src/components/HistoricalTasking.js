import React from 'react'

import { Link } from 'react-router-dom'

function HistoricalTasking({tasking, index}) {
    var className = ""
    if (index %2 === 1) {
        className = "alt-row"
    }
    return (
        <tr className={className}>
            <td>{tasking.location}</td>
            <td>{tasking.startDate.split('T')[0]}</td>
            <td>{tasking.endDate.split('T')[0]}</td>
            <td><Link to={`/taskings/${tasking.id}`}>Details</Link></td>
        </tr>
    )
}

export default HistoricalTasking