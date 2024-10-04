import ItemType from "./ItemType";

interface OrderItemType {
    id: number;
    items: ItemType[],
    qty: number,
    price: number
}

export default OrderItemType