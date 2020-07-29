import React, {
    useEffect,
    useState,
} from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import { Link } from 'react-router-dom'

const axios = require('axios').default

function UpdateTasking(props) {
    const [state, setState] = useState({
        location: "",
        startDate: "",
        endDate: "",
        requiredGrade: [],
        requirementCodes: [],
        afsc: "",
        assigned: false,
        gradeList: [],
        codeList: []
    })

    useEffect(() => {
        async function fetchData() {
            const taskResponse = await axios.get(`/api/taskers/${props.match.params.id}`)
            const enumResponse = await axios.get('/api/enums')
            var userResponse = {}
            userResponse.data = false
            if (taskResponse.data.assignedPersonnelId) {
                userResponse = await axios.get(`/api/users/${taskResponse.data.assignedPersonnelId}`)
            }
            setState({
                ...state,
                location: taskResponse.data.location,
                startDate: taskResponse.data.startDate,
                endDate: taskResponse.data.endDate,
                requiredGrade: taskResponse.data.requiredGrade,
                requirementCodes: taskResponse.data.requirementCodes,
                afsc: taskResponse.data.afsc,
                assigned: userResponse.data,
                gradeList: enumResponse.data.grades,
                codeList: enumResponse.data.codes,
            })
        }
        fetchData()
    }, [])

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    })

    const handleSubmit = async () => {
        const response = await axios.patch(`/api/taskers/${props.match.params.id}`, JSON.stringify({
            location: state.location,
            startDate: state.startDate,
            endDate: state.endDate,
            requiredGrade: state.requiredGrade,
            requirementCodes: state.requirementCodes,
            afsc: state.afsc,
        }))
        props.history.push(`/taskings/${response.data.id}`)
    }

    const handleGradeSelect = (event) => setState({
        ...state,
        requiredGrade: event,
    })

    const handleCodeSelect = (event) => setState({
        ...state,
        requirementCodes: event,
    })

    const handleRemove = () => {
        axios.put(`/api/taskers/${props.match.params.id}`, JSON.stringify({
            id: null,
        }))
        setState({
            ...state,
            assigned: false,
        })
    }

    const handleDelete = async () => {
        await axios.delete(`/api/taskers/${props.match.params.id}`)
        props.history.push('/')
    }
    
    const handleCancel = async () => {
        props.history.push(`/taskings/${props.match.params.id}`)
    }

    return (
        <div>
            <div className="grid-2">
                <p>Location:</p>
                <input type="text" name="location" value={state.location} onChange={handleChange}/>
                <p>Start Date:</p>
                <input type="date" name="startDate" value={state.startDate} onChange={handleChange}/>
                <p>End Date:</p>
                <input type="date" name="endDate" value={state.endDate} onChange={handleChange}/>
                <p>AFSC:</p>
                <input type="text" name="afsc" value={state.afsc} onChange={handleChange}/>
                <p>Required Grade(s):</p>
                <Multiselect options={state.gradeList} selectedValues={state.requiredGrade} isObject={false} onSelect={handleGradeSelect} onRemove={handleGradeSelect} 
                style={{ chips: { background: "#2F4CB3" }, searchBox: { border: "none" }, multiselectContainer: { color: "black", width: "300px", "align-self": "center" }, optionContainer: { width: "300px" }, inputField: { background: "white" }, option: { height: "30px" } }} />
                <p>Requirement Code(s):</p>
                <Multiselect options={state.codeList} selectedValues={state.requirementCodes} isObject={false} onSelect={handleCodeSelect} onRemove={handleCodeSelect} 
                style={{ chips: { background: "#2F4CB3" }, searchBox: { border: "none" }, multiselectContainer: { color: "black", width: "300px", "align-self": "center" }, optionContainer: { width: "300px" }, inputField: { background: "white" }, option: { height: "30px" } }} />
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
                <div></div>
                <button onClick={handleDelete}>Delete</button>
            </div>
            {state.assigned ? 
            <div className="grid-2">
                <p>Assigned:</p>
                <p><Link to={`/users/${state.assigned.id}`}>{`${state.assigned.grade} ${state.assigned.lastName}, ${state.assigned.firstName}`}</Link></p>
                <div></div>
                <button className="button-align-center" onClick={handleRemove}>Unassign</button>
            </div>
            :
            ""
            }
        </div>
    )
}

export default UpdateTasking