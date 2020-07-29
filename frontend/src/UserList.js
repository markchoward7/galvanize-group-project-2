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
            <thead>
                <tr>
                    <th>Grade</th>
                    <th>Name</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {state.personnel.map(member => <User member={member} index={index++} key={member.id}/>)}
            </tbody>
        </table>

    )
}

export default UserList