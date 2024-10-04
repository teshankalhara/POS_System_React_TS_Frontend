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
    const [itemPrice, setItemPrice] = useState<number>(0)

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
            changeItemPrice()
        }
    }, [isAuthenticated, changeItemPrice])

    function changeItemId(event: any) {
        setItemId(event.target.value)
    }

    function changeItemPrice() {
        items.map((item) => {
            if (item.id == itemId) {
                setItemPrice(item.price)
            }
        })
        if(!itemId){
            setItemPrice(0)
        }
    }

    function changeItemQty(event: any) {
        setItemQty(Number(event.target.value))
    }

    async function addOrder() {
        if (stocks) {

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
                                            )
                                        })}
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Price:</label>
                                <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                    type="number" value={itemPrice}
                                />
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
                                <button
                                    className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800"
                                    type="button"
                                    onClick={addOrder}
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