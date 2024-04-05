import { Card, Text } from "@radix-ui/themes";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import CardDispay from "./components/ShopCollections/CardDisplay";
function App() {
  return (
    <main className="w-full relative container mx-auto px-[10px] md:px-[150px]">
      <NavigationBar></NavigationBar>
      <CardDispay></CardDispay>
    </main>
  );
}
export default App;
