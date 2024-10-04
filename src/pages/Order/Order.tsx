import { useEffect, useState } from "react"
import OrderType from "../../types/Order/OrderType"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Order() {
    const { isAuthenticated, jwtToken } = useAuth()
    const [orders, setOrders] = useState<OrderType[]>([])

    const navigate=useNavigate()

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadOrders() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/orders", config)
            setOrders(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadOrders()
        }
    }, [loadOrders])

    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">Orders</h1>
            </div>

            <div className="container mx-auto mb-10">
                <div className="flex justify-center items-center mt-4 mb-8 border-b-2 border-b-slate-200 pb-5">
                    <div className="max-w-[200px]">
                        <button onClick={()=>{navigate('/order/create')}} className="w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800" type="button">
                            Create Order
                        </button>
                    </div>
                </div>

                <div className="mt-4 mb-8">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">All Orders</h1>
                    </div>

                    <div className="border border-slate-200 rounded-lg max-w-full w-full center p-5 shadow-lg">
                        <table className="table min-w-full border-separate border-spacing-0 border-none text-left">
                            <thead>
                                <tr>
                                    <th className="border py-3 p-2 w-[150px]">Ordered ID</th>
                                    <th className="border py-3 p-2">Ordered Date</th>
                                    <th className="border py-3 p-2">Total Price (LKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, id) => (
                                    <tr key={id}>
                                        <td className="border p-1 px-2">
                                            {order.id}
                                        </td>
                                        <td className="border p-1 px-2">date</td>
                                        <td className="border p-1 px-2">{order.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order