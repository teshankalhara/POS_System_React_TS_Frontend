import { useEffect, useState } from "react"
import StockType from "../../types/StockType"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import ItemType from "../../types/ItemType"

function CreateOrder() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [items, setItems] = useState<ItemType[]>([])
    const [stocks, setStocks] = useState<StockType[]>([])
    const [itemId, setItemId] = useState<number | undefined>()
    const [itemQty, setItemQty] = useState<number>(0)
    const [itemPrice, setItemPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadItems()
            loadStocks()
        }
    }, [isAuthenticated])

    useEffect(() => {
        setTotalPrice(itemPrice * itemQty)
    }, [itemPrice, itemQty])

    const loadStocks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/stock", config)
            setStocks(response.data)
        } catch (error) {
            console.error("Error loading stocks:", error)
        }
    }

    const loadItems = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/item", config)
            setItems(response.data)
        } catch (error) {
            console.error("Error loading items:", error)
        }
    }

    const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value)
        setItemId(selectedId)
        setError(null)

        const selectedItem = items.find(item => item.id === selectedId)
        setItemPrice(selectedItem?.price || 0)
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = Number(event.target.value)
        setItemQty(Math.max(quantity, 0))
    }

    const addOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!itemId || itemQty <= 0) {
            setError("Please select an item and enter a valid quantity.")
            return
        }

        const stock = stocks.find(stock => stock.id === itemId)

        if (!stock) {
            console.error(`Stock not found for item ID: ${itemId}`)
            return
        }

        if (stock.qty < itemQty) {
            setError(`Insufficient stock for item ID: ${itemId}. Available: ${stock.qty}, Requested: ${itemQty}`)
            return
        }

        const orderData = {
            orderItems: [{ itemId, quantity: itemQty }]
        }

        console.log("Order added:", orderData)

        try {
            const response = await axios.post("http://127.0.0.1:8000/orders", orderData, config)
            console.log("Order response:", response.data)

            // Clear the form
            setItemId(undefined) // Clear the selected item
            setItemQty(0) // Clear the quantity
            setItemPrice(0) // Clear the price
            setTotalPrice(0) // Clear the total price
            setError(null) // Clear any previous errors
        } catch (error: any) {
            console.error("Error sending order data:", error.response ? error.response.data : error)
        }
    }

    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">CreateOrder</h1>
            </div>
            <div className="container mx-auto mb-10">
                <div className="mt-4 mb-8">
                    <div className="flex justify-center">
                        <form onSubmit={addOrder} className="border border-slate-200 rounded-lg max-w-[500px] min-w-[400px] center mb-2 p-4 shadow-lg">
                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Name:</label>
                                <select
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    onChange={handleItemChange}
                                    value={itemId || ""} // Ensure the select reflects the correct state
                                >
                                    <option value="">Select Item</option>
                                    {items.length > 0 ? (
                                        items.map(item => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No items available</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Price:</label>
                                <input
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    type="number"
                                    value={itemPrice}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Qty:</label>
                                <input
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    type="number"
                                    min={0}
                                    placeholder="Enter Qty"
                                    onChange={handleQuantityChange}
                                    value={itemQty}
                                    required
                                />
                                {error && (
                                    <div className="text-red-500 text-center mt-0 mb-2">{error}</div>
                                )}
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Total Price:</label>
                                <input
                                    className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    type="number"
                                    value={totalPrice}
                                    readOnly
                                />
                            </div>

                            <div>
                                <button
                                    className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800"
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateOrder
