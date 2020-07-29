import React from 'react'

import { Link } from 'react-router-dom'

const axios = require('axios').default

function Sidebar(props) {

    return (
        <div className='sidebar'>
            <Link to="/">Home</Link>
            <br />
            <Link to="/taskings/create">Create Tasking</Link>
            <br />
            <Link to="/users">Personnel Listing</Link>
            <br />
            <Link to="/users/create">Add Personnel</Link>
        </div>
    )
}

export default Sidebar