import React from 'react';
import {Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import {formatCurrency} from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({isOpen}: ShoppingCartProps) => {
    const {closeCart, cartItems} = useShoppingCart();
    return (
        <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
            <OffcanvasHeader closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item}/>
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {
                        formatCurrency(
                            cartItems.reduce((total, cartItem)=> {
                                const item = storeItems.find(item => item.id === cartItem.id);
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )
                    }
                    </div>
                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )
};

export default ShoppingCart;