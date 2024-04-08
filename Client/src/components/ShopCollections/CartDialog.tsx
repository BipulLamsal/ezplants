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
import { toast } from "react-toastify";

const CartDialog = () => {
  const { cartItems, setCartItems, updateCartItem, deleteCartItem } = useCart();
  const handleQuantityChange = (itemId, quantity) => {
    const updatedItem = cartItems.find((item) => item._id === itemId);
    if (updatedItem) {
      updatedItem.quantity = parseInt(quantity);
      updateCartItem(updatedItem);
    }
  };

  const showTotalPrice = () => {
    const totalSum = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    return totalSum;
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

      if (response.status == 401) {
        toast("User Not Logged in");
      }
      const data = await response.json();
      if (response.ok) {
        toast("Request Success - Review Email for Further Process");
        setCartItems([]);
      } else {
        toast(`Request Failed ${data.msg}`);
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
            <Text> Total Cost : ${showTotalPrice()}</Text>
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
