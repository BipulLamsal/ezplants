import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  stock: string;
  qunatity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  updateCartItem: (updatedItem: CartItem) => void;
  deleteCartItem: (itemId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CardProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CardProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (item: CartItem) => {
    const isItemInCart = cartItems.some(
      (cartItem) => cartItem._id === item._id
    );
    console.log(isItemInCart);
    if (!isItemInCart) {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      console.log(cartItems);
    }
  };

  const updateCartItem = (updatedItem: CartItem) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setCartItems(updatedCartItems);
  };

  const deleteCartItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        updateCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
