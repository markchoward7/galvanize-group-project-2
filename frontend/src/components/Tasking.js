import React from 'react'

import { Link } from 'react-router-dom'

function Tasking({tasking}) {
    
    const assigned = tasking.assigned

    return (
        <div className="grid-2 tasking-card">
            <p className="left-align">Location:</p>
            <p className="right-align">{tasking.location}</p>
            <p className="left-align">Start Date:</p>
            <p className="right-align">{tasking.startDate}</p>
            <p className="left-align">End Date:</p>
            <p className="right-align">{tasking.endDate}</p>
            <p className="left-align">Assigned:</p>
            {assigned ? 
                <p className="right-align"><Link to={`/users/${assigned.id}`}>{`${assigned.grade} ${assigned.lastName}, ${assigned.firstName}`}</Link></p>
            :
                <p className="right-align">None</p>
            }
            <p></p>
            <p className="right-align"><Link to={`/taskings/${tasking.id}`}>Details</Link></p>
        </div>
    )
}

export default Tasking