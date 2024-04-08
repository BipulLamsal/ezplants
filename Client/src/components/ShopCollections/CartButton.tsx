import { Button, Dialog } from "@radix-ui/themes";
import { BiShoppingBag } from "react-icons/bi";
import { useCart } from "../../context/CartContext";

const CartButton = () => {
  const { cartItems } = useCart();
  return (
    <Dialog.Trigger>
      <Button
        variant="surface"
        color="red"
        size="3"
        className="bottom-[20px] right-0 absolute cursor-pointer"
      >
        <BiShoppingBag></BiShoppingBag> {cartItems.length}
      </Button>
    </Dialog.Trigger>
  );
};

export default CartButton;
