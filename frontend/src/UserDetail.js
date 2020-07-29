import React, {
    useEffect,
    useState,
} from 'react'
import { Link } from 'react-router-dom'

import HistoricalTasking from './HistoricalTasking'

const axios = require('axios').default

function UserDetail(props) {
    const [state, setState] = useState({
        member: {},
        taskingHistory: [],
    })
    var index = 0

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/api/users/${props.match.params.id}`)
            setState({
                ...state,
                member: response.data,
                taskingHistory: response.data.taskingHistory,
            })
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="grid-2">
                <p>Grade:</p>
                <p>{state.member.grade}</p>
                <p>Name:</p>
                <p>{state.member.lastName}, {state.member.firstName}</p>
                <p>EDIPI:</p>
                <p>{state.member.edipi}</p>
                <p>E-mail:</p>
                <p>{state.member.email}</p>
                <p>Unit:</p>
                <p>{state.member.unit}</p>
                <p>Base:</p>
                <p>{state.member.base}</p>
                <p>Role:</p>
                <p>{state.member.role}</p>
            </div>
            <p><Link to={`/users/${props.match.params.id}/update`}>Edit</Link></p>
            <p>Tasking History</p>
            <table>
                <tr>
                    <th>Location</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Link</th>
                </tr>
                {state.taskingHistory.map(tasking => <HistoricalTasking tasking={tasking} index={index++} />)}
            </table>
        </div>
    )
}

export default UserDetail