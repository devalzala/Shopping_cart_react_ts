import { Col, Row } from "react-bootstrap"
import storeItems from "../data/items.json"
import StoreItem from "../components/StoreItem"

const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems && storeItems.map((item, index) => (
                    <Col key={index}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Store