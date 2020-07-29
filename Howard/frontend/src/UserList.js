import React, {
    useEffect,
    useState,
}from 'react'

import User from './User'

const axios = require('axios').default

function UserList() {

    const [state, setState] = useState({
        personnel: [],
    })

    var index = 0

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/users")
            setState({
                ...state,
                personnel: response.data,
            })
        }
        fetchData()
    }, [])

    return (
        <table>
            <tr>
                <th>Grade</th>
                <th>Name</th>
                <th>Link</th>
            </tr>
            {state.personnel.map(member => <User member={member} index={index++} />)}
        </table>

    )
}

export default UserList