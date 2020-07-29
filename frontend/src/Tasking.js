import React, {
    useEffect,
    useState,
} from 'react'

import { Link } from 'react-router-dom'

const axios = require('axios').default

function Tasking({tasking}) {
    
    const [state, setState] = useState({
        assigned: {},
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/api/users/${tasking.assignedPersonnelId}`)
            setState({
                ...state,
                assigned: response.data.user
            })
        }
        if (tasking.assignedPersonnelId) {
            fetchData()
        }
    }, [])

    return (
        <div className="grid-2 tasking-card">
            <p className="left-align">Location:</p>
            <p className="right-align">{tasking.location}</p>
            <p className="left-align">Start Date:</p>
            <p className="right-align">{tasking.startDate}</p>
            <p className="left-align">End Date:</p>
            <p className="right-align">{tasking.endDate}</p>
            <p className="left-align">Assigned:</p>
            {tasking.assignedPersonnelId ? 
                <p className="right-align"><Link to={`/users/${tasking.assignedPersonnelId}`}>{`${state.assigned.grade} ${state.assigned.lastName}, ${state.assigned.firstName}`}</Link></p>
            :
                <p className="right-align">None</p>
            }
            <p></p>
            <p className="right-align"><Link to={`/taskings/${tasking.id}`}>Details</Link></p>
        </div>
    )
}

export default Tasking