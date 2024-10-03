import { useEffect, useState } from "react"
import ItemType from "../../types/ItemType"
import ItemCategoryType from "../../types/ItemCategoryType"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"

function Item() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [items, setItem] = useState<ItemType[]>([])
    const [itemName, setItemName] = useState<string>("")
    const [itemDescription, setItemDescription] = useState<string>("")
    const [itemPrice, setItemPrice] = useState<number>(0.0)
    const [itemCategoryId, setItemCategoryId] = useState<number>()

    const [itemCategories, setItemCategories] = useState<ItemCategoryType[]>([])

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/item", config)
            setItem(response.data);
        } catch (error) {
            console.error("Error loading items:", error)
        }
    }

    async function loadCategories() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/category", config)
            setItemCategories(response.data)
        } catch (error) {
            console.error("Error loading categories:", error)
        }
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadItems()
            loadCategories()
        }
    }, [isAuthenticated])

    function onChangeItemName(event: any) {
        setItemName(event.target.value)
    }

    function onChangeItemDescription(event: any) {
        setItemDescription(event.target.value)
    }

    function onChangeItemPrice(event: any) {
        setItemPrice(event.target.value)
    }

    function onChangeItemCategoryId(event: any) {
        setItemCategoryId(event.target.value)
    }

    function clearInputField() {
        setItemName("")
        setItemDescription("")
        setItemPrice(0.0)
        setItemCategoryId(0)
    }

    async function createItem() {
        const data = {
            name: itemName,
            price: itemPrice,
            description: itemDescription,
            itemCategoryId: itemCategoryId
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/item", data, config)
            console.log(response.data)
            loadItems()
            clearInputField()
        } catch (error: any) {
            console.log(error)
        }
    }

    const [editedItem, setEditedItem] = useState<ItemType | null>()

    function editItem(item: ItemType) {
        setEditedItem(item)
        setItemName(item.name)
        setItemDescription(item.description)
        setItemPrice(item.price)
        setItemCategoryId(item.itemCategory?.id)
    }

    async function updateItem() {
        const data = {
            name: itemName,
            price: itemPrice,
            description: itemDescription,
            itemCategoryId: itemCategoryId
        }
        try {
            const response = await axios.put(`http://127.0.0.1:8000/item/${editedItem?.id}`, data, config)
            console.log(response.data)
            loadItems()
            clearInputField()
        } catch (error: any) {
            console.log(error)
        }
    }

    async function deleteItem(itemId: number) {
        try {
            await axios.delete(`http://127.0.0.1:8000/item/${itemId}`, config)
            loadItems()
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">Item</h1>
            </div>
            
            <div className="container mx-auto mb-10">
                <div className="mt-4 mb-8">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">Create Item</h1>
                    </div>

                    <div className="flex justify-center">
                        <form className="border border-slate-200 rounded-lg max-w-[500px] min-w-[400px] center mb-2 p-4 shadow-lg">
                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Name:</label>
                                <input type="text" className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" onChange={onChangeItemName} value={itemName} required />
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Description:</label>
                                <input type="text" className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" onChange={onChangeItemDescription} value={itemDescription} required />
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Price:</label>
                                <input type="number" className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" onChange={onChangeItemPrice} value={itemPrice} min={0} required />
                            </div>

                            <div>
                                <label className="text-slate-600 font-sm block mb-2">Category:</label>
                                <select className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" onChange={onChangeItemCategoryId} value={itemCategoryId}>
                                    <option value="">Select Category</option>
                                    {itemCategories.map((category) => {
                                        return (
                                            <option value={category.id} key={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div>
                                {editedItem ? (
                                    <button className="border bg-slate-700 rounded-lg font-medium text-white px-4 py-3 w-full hover:bg-slate-800" type="button" onClick={updateItem}>Update</button>
                                ) : (
                                    <button className="border bg-slate-700 rounded-lg font-medium text-white px-4 py-3 w-full hover:bg-slate-800" type="button" onClick={createItem}>Create</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-4 mb-5">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">All Items</h1>
                    </div>
                    <div className="border border-slate-200 rounded-lg max-w-full w-full center p-5 shadow-lg">
                        <table className="table min-w-full border-separate border-spacing-0 border-none text-left">
                            <thead className="bg-slate-100 text-center">
                                <tr>
                                    <th className="border py-3 p-2 w-[70px]">No.</th>
                                    <th className="border py-3 p-2">Name</th>
                                    <th className="border py-3 p-2">Category</th>
                                    <th className="border py-3 p-2">Description</th>
                                    <th className="border py-3 p-2">Price (LKR)</th>
                                    <th className="border py-3 p-2 px-0 w-auto">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.map((item, id) => {
                                    return (
                                        <tr key={id} className="hover:bg-slate-100">
                                            <td className="border p-1 px-2">{id + 1}</td>
                                            <td className="border p-1 px-2">{item.name}</td>
                                            <td className="border p-1 px-2">{item.itemCategory.name}</td>
                                            <td className="border p-1 px-2">{item.description}</td>
                                            <td className="border p-1 px-2 text-right">{item.price}</td>
                                            <td className="border p-1 px-0 text-center">
                                                <button className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-500 hover:text-white mx-1" type="button" onClick={() => { editItem(item) }}>
                                                    Edit
                                                </button>
                                                <button className="bg-red-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white mx-1" type="button" onClick={() => { deleteItem(item.id) }}>
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

export default Item