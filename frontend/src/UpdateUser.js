import React, {
    useEffect, 
    useState,
} from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios').default

function UpdateUser(props) {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        edipi: 0,
        email: "",
        unit: "",
        base: "",
        role: "",
        grade: "",
        afsc: "",
        gradeList: [],
        roleList: [],
    })

    useEffect(() => {
        async function fetchData() {
            const userResponse = await axios.get(`/api/users/${props.match.params.id}`)
            const enumResponse = await axios.get("/api/enums")
            setState({
                ...state,
                firstName: userResponse.data.firstName,
                lastName: userResponse.data.lastName,
                edipi: userResponse.data.edipi,
                email: userResponse.data.email,
                unit: userResponse.data.unit,
                base: userResponse.data.base,
                role: userResponse.data.role,
                grade: userResponse.data.grade,
                afsc: userResponse.data.afsc,
                gradeList: enumResponse.data.grades,
                roleList: enumResponse.data.roles,
            })
        }
        fetchData()
    }, [])

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    })

    const handleSubmit = async () => {
        const response = await axios.patch(`/api/users/${props.match.params.id}`, JSON.stringify({
            firstName: state.firstName,
            lastName: state.lastName,
            edipi: state.edipi,
            email: state.email,
            unit: state.unit,
            base: state.base,
            role: state.role,
            grade: state.grade,
            afsc: state.afsc,
        }))
        props.history.push(`/users/${response.data.id}`)
    }

    return (
        <div className="grid-2">
            <p>First Name:</p>
            <input type="text" name="firstName" value={state.firstName} onChange={handleChange} />
            <p>Last Name:</p>
            <input type="text" name="lastName" value={state.lastName} onChange={handleChange} />
            <p>Grade:</p>
            <select name="grade" value={state.grade} onChange={handleChange}>
                {state.gradeList.map(grade => <option value={grade} key={grade}>{grade}</option>)}
            </select>
            <p>Role:</p>
            <select name="role" value={state.role} onChange={handleChange}>
                {state.roleList.map(role => <option value={role} key={role}>{role}</option>)}
            </select>
            <p>E-mail:</p>
            <input type="email" name="email" value={state.email} onChange={handleChange} />
            <p>Unit:</p>
            <input type="text" name="unit" value={state.unit} onChange={handleChange} />
            <p>Base:</p>
            <input type="text" name="base" value={state.base} onChange={handleChange} />
            <p>EDIPI:</p>
            <input type="number" name="edipi" value={state.edipi} onChange={handleChange} />
            <p>AFSC:</p>
            <input type="text" name="afsc" value={state.afsc} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <Link to={`/users/${props.match.params.id}`}><button>Cancel</button></Link>
        </div>
    )
}

export default UpdateUser