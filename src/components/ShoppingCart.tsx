import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import CartItem from "./CartItem"
import { formatCurrency } from "../utils/formatCurrency"
import storeItems from "../data/items.json"

const ShoppingCart = () => {
    const { isOpen, closeCart, cartItems } = useShoppingCart()

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems && cartItems.map((item, index) => (
                    <CartItem key={index} {...item} />
                ))}

                <div className="ms-auto fw-bold fs-5">Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find(i => i?.id == cartItem?.id)
                    return total + (item?.price || 0) * cartItem.quantity

                }, 0))}</div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}

export default ShoppingCart