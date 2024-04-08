import React from "react";
import { Badge, Box, Button, Card, Flex, Inset, Text } from "@radix-ui/themes";
import { BsStars } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../../context/CartContext"; // Import useCart hook

interface Product {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

const ShopCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItemToCart } = useCart(); // Access addItemToCart function from useCart hook

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <Card asChild className="cursor-default">
      <a href="#">
        <Badge
          color="amber"
          variant="surface"
          size="3"
          className="top-2 absolute right-2"
        >
          <BsStars />
          {product.rating}
        </Badge>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={product.image}
            alt={product.name}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>

        <Text as="div" size="3" weight="bold">
          {product.name}
        </Text>
        <Text as="div" color="gray" size="2" className="mb-2">
          {product.description}
        </Text>

        <Flex gap="2" justify="between" wrap="wrap" align="center">
          <Box>
            <Text weight="bold">${product.price}</Text>
          </Box>
          <Box>
            <Button
              size="2"
              className="cursor-pointer"
              onClick={handleAddToCart}
            >
              <FaCartShopping /> Add to cart
            </Button>
          </Box>
        </Flex>
      </a>
    </Card>
  );
};

export default ShopCard;
