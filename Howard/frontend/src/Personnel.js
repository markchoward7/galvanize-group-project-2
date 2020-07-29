import React from 'react'

import { Link } from 'react-router-dom'

const axios = require('axios').default

function Personnel({member, taskingId, updateParent}) {

    const assignMember = async () => {
        axios.put(`/api/taskers/${taskingId}`, JSON.stringify(member))
        updateParent(member)
    }

    return (
        <div className="grid-2">
            <Link to={`/users/${member.id}`}>{`${member.grade} ${member.lastName}, ${member.firstName}`}</Link>
            <a onClick={assignMember}>Assign Member</a>
        </div>
    )
}

export default Personnel