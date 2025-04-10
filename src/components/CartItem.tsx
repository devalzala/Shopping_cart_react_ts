import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utils/formatCurrency"

type CartItemProps = {
    id: number,
    quantity: number
}


const CartItem = ({ id, quantity }: CartItemProps) => {
    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(i => i?.id == id)

    if (item == null) return null


    return (
        <Stack gap={2} direction="horizontal">
            <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />

            <div className="me-auto">
                <div>
                    {item && item.name} <span className="text-muted" style={{ fontSize: "0.65rem" }}>x{quantity}</span>
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
        </Stack>
    )
}

export default CartItem