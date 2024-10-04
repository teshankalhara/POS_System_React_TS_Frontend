import ItemCategoryType from "./ItemCategoryType"

interface ItemType {
    id: number,
    name: string,
    description: string,
    price: number,
    itemCategory: ItemCategoryType
}

export default ItemType