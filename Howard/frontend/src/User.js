import React from 'react'

import { Link } from 'react-router-dom'

function User({member, index}) {

    var className = ""
    if (index % 2 === 1) {
        className = "alt-row"
    } 
    return (
        <tr className={className}>
            <td>{member.grade}</td>
            <td>{member.lastName}, {member.firstName}</td>
            <td><Link to={`/users/${member.id}`}>Details</Link></td>
        </tr>
    )
}

export default User