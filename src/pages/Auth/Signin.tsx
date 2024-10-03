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
            <div className="text-center border-b-2 border-b-slate-200 pb-3 mb-6">
                <h1 className="text-3xl font-extrabold">Signin</h1>
            </div>

            <div className="container mx-auto mb-10 mt-4">
                <div className="flex items-center justify-center">
                    <form onSubmit={submit} className="border border-slate-200 rounded-lg max-w-[500px] min-w-[400px] center p-4 shadow-lg">
                        <div>
                            <input type="text" className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" onChange={usernameChange} placeholder="Username" />
                        </div>
                        <div>
                            <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="password" onChange={passwordChange} placeholder="Password" />
                        </div>
                        <div>
                            <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="password" onChange={confirmPasswordChange} placeholder="Confirm Password" />
                        </div>
                        {error && <div>{error}</div>}
                        <div>
                            <button className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-blue-700 hover:bg-blue-600" type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin