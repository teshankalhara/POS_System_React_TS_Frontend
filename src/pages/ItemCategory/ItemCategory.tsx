import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import ItemCategoryType from "../../types/ItemCategory/ItemCategoryType"
import axios from "axios"

function ItemCategory() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [categories, setCategories] = useState<ItemCategoryType[]>([])
    const [categoryName, setCategoryName] = useState<string>("")

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadCategories() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/category", config)
            console.log(response)
            setCategories(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadCategories()
        }
    }, [isAuthenticated])

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value)
    }

    async function createItemCategory() {
        const data = {
            name: categoryName
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/category", data, config)
            console.log(response.data)
            loadCategories()
            setCategoryName("")
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="text-center border-b-2 border-b-slate-200 pb-3">
                <h1 className="text-3xl font-extrabold">Category</h1>
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
                                <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg mb-4" type="text" onChange={handleCategoryName} value={categoryName} placeholder="Enter Category Name" required />
                            </div>

                            <div>
                                <button className="border w-full text-white rounded-lg px-4 py-3 font-medium bg-slate-700 hover:bg-slate-800" type="button" onClick={createItemCategory}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-4 mb-5">
                    <div className="text-center mb-2">
                        <h1 className="text-xl font-bold text-slate-700">All Categories</h1>
                    </div>

                    <div className="border text-center border-slate-200 rounded-lg max-w-full w-full center p-4 shadow-lg">
                        {categories && categories.map((category) => {
                            return (
                                <div className="cursor-default text-slate-600 border border-slate-950 rounded-lg mb-3 px-3 py-2 shadow-lg inline-block me-3 hover:bg-slate-100" key={category.id}>
                                    {category.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCategory