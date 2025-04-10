import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/shoppingCartContext"

const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCart()

    return <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
            </Nav>

            <Button variant="outline-primary" className="rounded" style={{ position: "relative" }} onClick={openCart}>
                Cart
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", top: 0, right: 0, transform: "translate(60%, -30%)" }}>{cartQuantity}</div>
            </Button>
        </Container>
    </NavbarBs>
}

export default Navbar