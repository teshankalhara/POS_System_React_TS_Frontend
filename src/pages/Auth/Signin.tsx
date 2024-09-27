import { data } from "autoprefixer"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signin() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
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

    function confirmPasswordChange(event: any) {
        setConfirmPassword(event.target.value)
        setError("")
    }

    async function submit(event: any) {
        event.preventDefault()
        if (username === "" && password === "" && confirmPassword === "") {
            setError("Username, Password and Confirm Password Required!")
        } else if (username === "") {
            setError("Username Required!")
            if (password === "") {
                setError("Username and Password Required!")
            }
            if (confirmPassword === "") {
                setError("Username and Confirm Password Required!")
            }
        } else if (password === "") {
            setError("Password Required!")
            if (confirmPassword === "") {
                setError("Password and Confirm Password Required!")
            }
        } else if (confirmPassword === "") {
            setError("Confirm Password Required!")
        }

        if (password == confirmPassword) {
            const data = {
                username: username,
                password: password
            }
            try {
                const response = await axios.post("http://127.0.0.1:8000/user/sign", data)
                console.log(response.data)
                navigate("/login")
            } catch (error) {
                setError("There was an error create account!")
            }
        } else {
            setError("Password and Confirm Password Mismatch!")
        }

    }
    return (
        <>
            <h1>Signin</h1>
            <div>
                <form onSubmit={submit}>
                    <div>
                        <input type="text" onChange={usernameChange} placeholder="Username" />
                    </div>
                    <div>
                        <input type="password" onChange={passwordChange} placeholder="Password" />
                    </div>
                    <div>
                        <input type="password" onChange={confirmPasswordChange} placeholder="Confirm Password" />
                    </div>
                    {error && <div>{error}</div>}
                    <div>
                        <button type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin