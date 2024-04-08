import React from "react";
import {
  Flex,
  Button,
  Text,
  Box,
  Card,
  Avatar,
  Select,
} from "@radix-ui/themes";
import { FaDeleteLeft } from "react-icons/fa6";

const CartInnerCard = ({ item, deleteCartItem, handleQuantityChange }) => {
  return (
    <Box key={item._id} className="py-1">
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={item.image} radius="full" fallback="B" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {item.name}
            </Text>
            <Text as="div" size="2" color="gray">
              Qunatity :
              <Select.Root
                defaultValue={item.quantity.toString()}
                size="1"
                onValueChange={(value) => {
                  handleQuantityChange(item._id, value);
                }}
              >
                <Select.Trigger variant="soft" className="ml-2" />
                <Select.Content>
                  {[...Array(parseInt(item.stock)).keys()].map((index) => (
                    <div key={index}>
                      <Select.Item value={String(index + 1)}>
                        {index + 1}
                      </Select.Item>
                    </div>
                  ))}
                </Select.Content>
              </Select.Root>
            </Text>
          </Box>
          <Box className="flex-1" />
          <Text as="div" size="2" weight="bold">
            ${parseInt(item.quantity) * parseInt(item.price)}
          </Text>
          <Button
            variant="soft"
            size="2"
            color="red"
            onClick={() => deleteCartItem(item._id)}
          >
            <FaDeleteLeft />
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};
export default CartInnerCard;
