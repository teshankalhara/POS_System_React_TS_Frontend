import { useEffect, useState } from "react";
import StockType from "../../types/StockType";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ItemType from "../../types/ItemType";

function CreateOrder() {
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
            loadItem()
            loadStock()
        }
    }, [isAuthenticated])

    function changeItemId(event: any) {
        setItemId(event.target.value)
    }

    function changeItemQty(event: any) {
        setItemQty(Number(event.target.value))
    }
    
    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">CreateOrder</h1>
            </div>

            <div className="container mx-auto mb-10">
                <div className="mt-4 mb-8">
                    <div className="flex justify-center">
                        <form className="border border-slate-200 rounded-lg max-w-[500px] min-w-[400px] center mb-2 p-4 shadow-lg">
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
                                    required
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateOrder