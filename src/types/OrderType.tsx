import OrderItemType from "./OrderItemType"

interface OrderType {
    id: number,
    totalPrice: number,
    date: Date,
    orderedItems: OrderItemType[]
}

export default OrderType