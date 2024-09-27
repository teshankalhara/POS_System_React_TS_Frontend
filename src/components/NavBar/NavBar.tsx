import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function NavBar() {
    const { logout, isAuthenticated } = useAuth()
    const navigation = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Category", path: "/category" },
        { name: "Item", path: "/item" },
        { name: "Stock", path: "/stock" },
        { name: "Order", path: "/order" },
    ]
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <>
            <nav className="py-2 px-4 shadow-xl mb-5">
                <ul className="flex items-center justify-between">
                    <li >
                        <Link to="/" className={`text-xl font-bold transition-colors duration-300 ${location.pathname === "/" ? "text-red-500" : "text-blue-500"} hover:text-red-500`}>
                            Home
                        </Link>
                    </li>
                    {
                        isAuthenticated && navigation.slice(1).map((link, index) => {
                            const isActive = location.pathname === link.path || (link.name === "Order" && location.pathname === "/order/create")
                            return (
                                <li key={index}>
                                    <Link to={link.path} className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-red-500" : "text-blue-500"} hover:text-red-500`}>
                                        {link.name}
                                    </Link>
                                </li>
                            )
                        })}
                    {isAuthenticated ? (
                        <li>
                            <button type="button" onClick={logout} className="text-lg px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <button type="button" onClick={() => { navigate("/login") }} className="text-lg px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium">
                                    Login
                                </button>
                                <button type="button" onClick={() => { navigate("/signin") }} className="text-lg ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium">
                                    Signin
                                </button>
                            </li>
                        </>
                    )
                    }

                </ul>
            </nav>
        </>
    )
}

export default NavBar