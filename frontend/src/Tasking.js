import React from 'react'

import { Link } from 'react-router-dom'

function Tasking({tasking}) {
    
    const tasker = tasking.tasker
    const assigned = tasking.assigned

    return (
        <div className="grid-2 tasking-card">
            <p className="left-align">Location:</p>
            <p className="right-align">{tasker.location}</p>
            <p className="left-align">Start Date:</p>
            <p className="right-align">{tasker.startDate}</p>
            <p className="left-align">End Date:</p>
            <p className="right-align">{tasker.endDate}</p>
            <p className="left-align">Assigned:</p>
            {tasking.tasker.assignedPersonnelId ? 
                <p className="right-align"><Link to={`/users/${tasker.assignedPersonnelId}`}>{`${assigned.grade} ${assigned.lastName}, ${assigned.firstName}`}</Link></p>
            :
                <p className="right-align">None</p>
            }
            <p></p>
            <p className="right-align"><Link to={`/taskings/${tasker.id}`}>Details</Link></p>
        </div>
    )
}

export default Tasking