import OrderItemType from "./OrderItemType"

interface OrderType {
    id: number,
    date: Date,
    totalPrice: number,
    orderedItems: OrderItemType[]
}

export default OrderType