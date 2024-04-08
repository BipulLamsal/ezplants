import { Box, Tabs, Theme, Text, Spinner } from "@radix-ui/themes";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useAdminAuth from "../hooks/useAdminAuth";
import { useEffect, useState } from "react";
import Plants from "../components/Admin/Plants";
import TransactionTable from "../components/Admin/TransactionTable";

const Admin = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      auth(token).then((isAuthenticated) => {
        if (!isAuthenticated) {
          navigate("/");
        } else {
          setIsLoading(false);
        }
      });
    } else {
      navigate("/");
    }
  }, [auth]);
  return (
    <Theme
      accentColor="teal"
      grayColor="sand"
      radius="large"
      scaling="95%"
      panelBackground="translucent"
      appearance={theme}
    >
      <Spinner size="3" loading={isLoading}>
        <main className="w-full relative container mx-auto px-[10px] md:px-[200px]">
          <NavigationBar></NavigationBar>

          <Tabs.Root defaultValue="plants">
            <Tabs.List>
              <Tabs.Trigger value="plants">Plants</Tabs.Trigger>
              <Tabs.Trigger value="transactions">Transaction</Tabs.Trigger>
              <Tabs.Trigger value="users">Users</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content value="plants">
                <Plants></Plants>
              </Tabs.Content>

              <Tabs.Content value="transactions">
                <TransactionTable></TransactionTable>
              </Tabs.Content>
              <Tabs.Content value="users">
                <Text size="2">
                  Edit your profile or update contact information.
                </Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </main>
      </Spinner>
    </Theme>
  );
};
export default Admin;
