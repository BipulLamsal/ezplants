import { Button, Dialog, Theme } from "@radix-ui/themes";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import CardDispay from "./components/ShopCollections/CardDisplay";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import CartDialog from "./components/ShopCollections/CartDialog";
import CartButton from "./components/ShopCollections/CartButton";
function App() {
  const { theme } = useTheme();

  return (
    <Theme
      accentColor="teal"
      grayColor="sand"
      radius="large"
      scaling="95%"
      panelBackground="translucent"
      appearance={theme}
    >
      <main className="w-full relative container mx-auto px-[10px] md:px-[200px]">
        <NavigationBar></NavigationBar>
        <CartProvider>
          <CardDispay></CardDispay>
          <Dialog.Root>
            <CartButton></CartButton>
            <CartDialog></CartDialog>
          </Dialog.Root>
        </CartProvider>
      </main>
    </Theme>
  );
}

export default App;
