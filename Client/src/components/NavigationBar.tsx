import { Button, Dialog, DropdownMenu, Text, Tooltip } from "@radix-ui/themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { useLoginButton } from "../context/LoginContext";
import { useAuthContext } from "../context/AuthContext";

const NavigationBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { login } = useLoginButton();
  const { isAuthenticated, isLoading, logout } = useAuthContext();
  return (
    <div className="flex flex-row justify-between py-7">
      <div className="flex flex-row items-center">
        <img src={logo} width={40}></img>
        <Text size="6" weight="bold">
          Ezplants
        </Text>
      </div>
      <div className="flex gap-2">
        <Tooltip
          content={`Toggle to ${theme == "dark" ? "light" : "dark"} mode`}
        >
          <Button
            size="3"
            variant="outline"
            className="cursor-pointer"
            onClick={toggleTheme}
          >
            {theme == "dark" ? <MdLightMode /> : <MdDarkMode />}
          </Button>
        </Tooltip>
        {!isAuthenticated ? (
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                size="3"
                variant="soft"
                className="cursor-pointer"
                loading={isLoading}
              >
                Log In
              </Button>
            </Dialog.Trigger>
            {!login ? <LoginDialog /> : <RegisterDialog />}
            {/* <RegisterDialog></RegisterDialog> */}
            {/* <LoginDialog /> */}
          </Dialog.Root>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button size="3" variant="soft" className="cursor-pointer">
                {localStorage.getItem("fullname")}
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item color="red" onClick={logout}>
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
