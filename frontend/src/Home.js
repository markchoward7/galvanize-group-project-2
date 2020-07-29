import React, {
    useEffect,
    useState
} from 'react'

import Tasking from './Tasking'

const axios = require('axios').default

function Home(props) {


    const [state, setState] = useState({
        taskings: [],
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/taskers")
            setState({
                ...state,
                taskings: response.data
            })
        }
        fetchData()
    }, [])

    return (
        <div className="grid-2">
            {state.taskings.map(tasking => <Tasking tasking={tasking} key={tasking.id} />)}
        </div>
    )
}

export default Home