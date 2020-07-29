import React, {
    useEffect,
    useState
} from 'react'

import { Link } from 'react-router-dom'

import Personnel from './Personnel'


const axios = require('axios').default

function TaskingDetail(props) {
    const [state, setState] = useState({
        tasking: {},
        assigned: {},
        availablePersonnel: [],
    })

    const assignMember = (member) => {
        let taskCopy = { ...state.tasking }
        taskCopy.assignedPersonnelId = member.id
        setState({
            ...state,
            assigned: member,
            tasking: taskCopy,
        })
    }

    useEffect(() => {
        async function fetchData() {
            const taskerResponse = await axios.get(`/api/taskers/${props.match.params.id}`)
            taskerResponse.data.requiredGrade = taskerResponse.data.requiredGrade.join(", ")
            taskerResponse.data.requirementCodes = taskerResponse.data.requirementCodes.join(", ")
            if (taskerResponse.data.assignedPersonnelId) {
                const personnelResponse = await axios.get(`/api/users/${taskerResponse.data.assignedPersonnelId}`)
                setState({
                    ...state,
                    tasking: taskerResponse.data,
                    assigned: personnelResponse.data.user,
                })
            } else {
                const personnelResponse = await axios.get(`/api/taskers/${props.match.params.id}/available`)
                setState({
                    ...state,
                    tasking: taskerResponse.data,
                    availablePersonnel: personnelResponse.data,
                })
            }
        }
        fetchData()
    }, [])

    return (
        <div>       
            <div className="grid-2">
                <p>Location:</p>
                <p>{state.tasking.location}</p>
                <p>Start Date:</p>
                <p>{state.tasking.startDate}</p>
                <p>End Date:</p>
                <p>{state.tasking.endDate}</p>
                <p>Required Grade(s):</p>
                <p>{state.tasking.requiredGrade}</p>
                <p>Requirement Code(s):</p>
                <p>{state.tasking.requirementCodes}</p>
                <p>Required AFSC:</p>
                <p>{state.tasking.afsc}</p>
            </div>
            <Link to={`${props.location.pathname}/update`}>Edit</Link>
            {state.tasking.assignedPersonnelId ? 
                <div className="grid-2">
                    <p>Assigned:</p>
                    <p><Link to={`/users/${state.assigned.id}`}>{`${state.assigned.grade} ${state.assigned.lastName}, ${state.assigned.firstName}`}</Link></p>
                </div>
            :
                <div>
                    <p>Available Personnel:</p>
                    <div>
                        {state.availablePersonnel.map(member => <Personnel member={member} taskingId={state.tasking.id} updateParent={assignMember} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default TaskingDetail