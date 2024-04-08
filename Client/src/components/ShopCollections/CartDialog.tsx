import React from "react";
import {
  Dialog,
  Flex,
  Button,
  Text,
  ScrollArea,
  Box,
  Card,
  Avatar,
  Select,
} from "@radix-ui/themes";
import { useCart } from "../../context/CartContext";
import CartInnerCard from "./CartInnerCard";

const CartDialog = () => {
  const { cartItems, updateCartItem, deleteCartItem } = useCart();

  const handleQuantityChange = (itemId, quantity) => {
    const updatedItem = cartItems.find((item) => item._id === itemId);
    alert("hello");
    if (updatedItem) {
      updatedItem.quantity = parseInt(quantity);
      updateCartItem(updatedItem);
    }
  };

  const handleSubmit = async () => {
    try {
      const cartItemsJSON = JSON.stringify(cartItems);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/transaction/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: cartItemsJSON,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data sent successfully:", data);
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };

  return (
    <Dialog.Content maxWidth="450px">
      {cartItems.length != 0 ? (
        <>
          <ScrollArea scrollbars="vertical" style={{ height: 200 }}>
            {cartItems.map((item) => (
              <CartInnerCard
                item={item}
                key={item._id}
                handleQuantityChange={handleQuantityChange}
                deleteCartItem={deleteCartItem}
              ></CartInnerCard>
            ))}
          </ScrollArea>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Request All</Button>
            </Dialog.Close>
          </Flex>
        </>
      ) : (
        <Text>You have nothing in your cart!</Text>
      )}
    </Dialog.Content>
  );
};
export default CartDialog;
