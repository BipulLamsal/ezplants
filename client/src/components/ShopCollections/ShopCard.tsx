import { Badge, Box, Button, Card, Flex, Inset, Text } from "@radix-ui/themes";
import { BsStars } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
const ShopCard = () => {
  return (
    <Card asChild className="cursor-default">
      <a href="#">
        <Badge
          color="amber"
          variant="soft"
          size="3"
          className="top-2 absolute right-2"
        >
          <BsStars />
          5.0
        </Badge>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
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
          Wonder Cactus
        </Text>
        <Text as="div" color="gray" size="2" className="mb-2">
          Start building your next project in minutes
        </Text>

        <Flex gap="2" justify="between" wrap="wrap" align="center">
          <Box>
            <Text weight="bold">$2999</Text>
          </Box>
          <Box>
            <Button size="2" className="cursor-pointer">
              <FaCartShopping /> Add to cart
            </Button>
          </Box>
        </Flex>
      </a>
    </Card>
  );
};
export default ShopCard;
