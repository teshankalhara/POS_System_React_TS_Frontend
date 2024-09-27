import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const navigation = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Category", path: "/category" },
        { name: "Stock", path: "/stock" },
        { name: "Order", path: "/order" },
        { name: "Login", path: "/login" },
        { name: "SignIn", path: "/signin" },
    ]

    const location = useLocation()
    return (
        <>
            <nav>
                <ul style={{ listStyle: "none" }}>
                    {navigation.map((link, index) => {
                        const isActive = location.pathname === link.path || (link.name === "Order" && location.pathname === "/order/create")
                        return (
                            <li key={index}>
                                <Link to={link.path} style={{ color: isActive ? "red" : "blue" }}>
                                    {link.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default NavBar