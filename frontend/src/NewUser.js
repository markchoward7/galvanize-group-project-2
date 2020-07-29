import React, {
    useEffect,
    useState
} from 'react'

const axios = require('axios').default

function NewUser(props) {
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
            const response = await axios.get("/api/enums")
            setState({
                ...state,
                gradeList: response.data.grades,
                roleList: response.data.roles,
                grade: response.data.grades[0],
                role: response.data.roles[0],
            })
        }
        fetchData()
    }, [])

    const handleChange = (event) => setState({
        ...state,
        [event.target.name]: event.target.value,
    })

    const handleSubmit = async () => {
        const response = await axios.post("/api/users", JSON.stringify({
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

    const handleCancel = () => {
        props.history.push('/')
    }

    return (
        <div className="grid-2">
            <p>First Name:</p>
            <input type="text" name="firstName" onChange={handleChange} />
            <p>Last Name:</p>
            <input type="text" name="lastName" onChange={handleChange} />
            <p>Grade:</p>
            <select name="grade" onChange={handleChange}>
                {state.gradeList.map(grade => <option value={grade} key={grade}>{grade}</option>)}
            </select>
            <p>Role:</p>
            <select name="role" onChange={handleChange}>
                {state.roleList.map(role => <option value={role} key={role}>{role}</option>)}
            </select>
            <p>E-mail:</p>
            <input type="email" name="email" onChange={handleChange} />
            <p>Unit:</p>
            <input type="text" name="unit" onChange={handleChange} />
            <p>Base:</p>
            <input type="text" name="base" onChange={handleChange} />
            <p>EDIPI:</p>
            <input type="number" name="edipi" onChange={handleChange} />
            <p>AFSC:</p>
            <input type="text" name="afsc" onChange={handleChange} />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default NewUser