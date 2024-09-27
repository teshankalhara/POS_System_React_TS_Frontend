import axios from "axios"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
    const { login } = useAuth()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    function usernameChange(event: any) {
        setUsername(event.target.value)
        setError("")
    }

    function passwordChange(event: any) {
        setPassword(event.target.value)
        setError("")
    }

    async function submit(event: any) {
        event.preventDefault()
        if (username === "" && password === "") {
            setError("Username and Password Required!")
        } else if (username === "") {
            setError("Username Required!")
        } else if (password === "") {
            setError("Password Required!")
        }
        const data = {
            username: username,
            password: password
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/user/login", data)
            login(response.data)
            //console.log(response.data)
            navigate("/")
        } catch (error) {
            setError("There was an error login!")
        }
    }

    return (
        <>
            <h1>Login</h1>
            <div>
                <form onSubmit={submit}>
                    <div>
                        <input type="text" onChange={usernameChange} placeholder="Username" />
                    </div>
                    <div>
                        <input type="password" onChange={passwordChange} placeholder="Password" />
                    </div>
                    {error && <div>{error}</div>}
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login