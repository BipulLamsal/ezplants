import { Button, Text } from "@radix-ui/themes";
import logo from "../assets/logo.png";
const NavigationBar = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <img src={logo} width={40}></img>
        <Text size="6" weight="bold">
          Ezplants
        </Text>
      </div>
      <div>
        <Button size="3" variant="soft">
          Log In
        </Button>
      </div>
    </div>
  );
};
export default NavigationBar;
