import { useEffect, useState } from "react"
import ItemType from "../../types/ItemType"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import StockType from "../../types/StockType"

function Stock() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [items, setItems] = useState<ItemType[]>([])
    const [itemId, setItemId] = useState<number>()
    const [itemQty, setItemQty] = useState<number>(0)

    const [stocks, setStock] = useState<StockType[]>([])

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadStock() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/stock", config)
            setStock(response.data)
        } catch (error: any) {
            console.error(error)
        }
    }

    async function loadItem() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/item", config)
            setItems(response.data)
        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadStock()
            loadItem()
        }
    }, [isAuthenticated])

    function changeItemId(event: any) {
        setItemId(event.target.value)
    }

    function changeItemQty(event: any) {
        setItemQty(Number(event.target.value))
    }

    function clearInputField() {
        setItemId(0)
        setItemQty(0)
    }

    async function addStock() {
        const data = {
            qty: itemQty,
            itemId: itemId
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/stock", data, config)
            console.log(response.data);
            loadStock()
            clearInputField()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteStock(stockId: number) {
        try {
            await axios.delete(`http://127.0.0.1:8000/stock/${stockId}`, config)
            loadStock()
        } catch (error: any) {
            console.log(error)
        }
    }

    const [editedStock, setEditedStock] = useState<StockType | null>()

    function editStock(stock: StockType) {
        setEditedStock(stock)
        setItemQty(stock.qty)
        setItemId(stock.item?.id)
    }

    async function updateStock() {
        const data = {
            qty: itemQty,
            itemId: itemId
        }
        try {
            await axios.put(`http://127.0.0.1:8000/stock/${editedStock?.id}`, data, config)
            loadStock()
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">Stock</h1>
            </div>

            <div className="container mx-auto mb-10">
                <div className="mt-4 mb-8">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">Create Category</h1>
                    </div>

                    <div className="flex items-center justify-center">
                        <form className="border border-slate-200 rounded-lg max-w-[500px] min-w-[400px] center p-4 shadow-lg">
                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Name:</label>
                                <select
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    onChange={changeItemId}
                                    value={itemId}
                                >
                                    <option value="">Select Item</option>
                                    {items &&
                                        items.map((item, id) => {
                                            return (
                                                <option value={item.id} key={id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Qty:</label>
                                <input
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    type="number"
                                    min={0}
                                    placeholder="Enter Qty"
                                    onChange={changeItemQty}
                                    value={itemQty}
                                    required
                                />
                            </div>

                            <div>
                                {editedStock ? (
                                    <button
                                        className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800"
                                        type="button"
                                        onClick={updateStock}
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button
                                        className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800"
                                        type="button"
                                        onClick={addStock}
                                    >
                                        Add
                                    </button>
                                )}

                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-4 mb-5">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">All Categories</h1>
                    </div>

                    <div className="border border-slate-200 rounded-lg max-w-full w-full center p-5 shadow-lg">
                        <table className="table min-w-full border-separate border-spacing-0 border-none text-left">
                            <thead className="bg-slate-100 text-center">
                                <tr>
                                    <th className="border py-3 p-2 w-[70px]">No.</th>
                                    <th className="border py-3 p-2">Item</th>
                                    <th className="border py-3 p-2">Category</th>
                                    <th className="border py-3 p-2">Qty</th>
                                    <th className="border py-3 p-2">Price (LKR)</th>
                                    <th className="border py-3 p-2 px-0 w-auto">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks && stocks.map((stock, id) => {
                                    return (
                                        <tr key={id} className="hover:bg-slate-100">
                                            <td className="border p-1 px-2">{id + 1}</td>
                                            <td className="border p-1 px-2">{stock.item.name}</td>
                                            <td className="border p-1 px-2">{stock.item.itemCategory.name}</td>
                                            <td className="border p-1 px-2 text-right">{stock.qty}</td>
                                            <td className="border p-1 px-2 text-right">{stock.item.price}</td>
                                            <td className="border p-1 px-0 text-center">
                                                <button className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-500 hover:text-white mx-1" type="button" onClick={() => editStock(stock)}>
                                                    Edit
                                                </button>
                                                <button className="bg-red-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white mx-1" type="button" onClick={() => deleteStock(stock.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stock