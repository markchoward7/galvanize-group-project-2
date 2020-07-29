import React, {
    useEffect,
    useState,
} from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import { Link } from 'react-router-dom'

const axios = require('axios').default

function NewTasking(props) {
    const [state, setState] = useState({
        location: "",
        startDate: "",
        endDate: "",
        requiredGrade: [],
        requirementCodes: [],
        afsc: "",
        gradeList: [],
        codeList: []
    })

    useEffect(() => {
        async function fetchData() {
            const gradesResponse = await axios.get("/api/grades")
            const codesResponse = await axios.get("/api/requirement-codes")
            setState({
                ...state,
                gradeList: gradesResponse.data,
                codeList: codesResponse.data,
            })
        }
        fetchData()
    }, [])

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    })

    const handleSubmit = async () => {
        const response = await axios.post("/api/taskers", JSON.stringify({
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

    
    return (
        <div>
            <div className="grid-2">
                <p>Location:</p>
                <input type="text" name="location" onChange={handleChange}/>
                <p>Start Date:</p>
                <input type="date" name="startDate" onChange={handleChange}/>
                <p>End Date:</p>
                <input type="date" name="endDate" onChange={handleChange}/>
                <p>AFSC:</p>
                <input type="text" name="afsc" onChange={handleChange}/>
                <p>Required Grade(s):</p>
                <Multiselect options={state.gradeList} isObject={false} onSelect={handleGradeSelect} onRemove={handleGradeSelect}
                style={{ chips: { background: "darkslategrey" }, searchBox: { border: "none" }, multiselectContainer: { color: "black" } }} />
                <p>Requirement Code(s):</p>
                <Multiselect options={state.codeList} isObject={false} onSelect={handleCodeSelect} onRemove={handleCodeSelect}
                style={{ chips: { background: "darkslategrey" }, searchBox: { border: "none" }, multiselectContainer: { color: "black" } }} />
                <button onClick={handleSubmit}>Submit</button>
                <Link to={`/`}><button>Cancel</button></Link>
            </div>
        </div>
    )
}

export default NewTasking