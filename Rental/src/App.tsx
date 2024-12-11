import "@radix-ui/themes/styles.css";
import './App.css'
import { Container, Box } from '@radix-ui/themes';
import Navigation from "./navigation";
import Menu from "./components/menu";

function App() {
  return (
    <Box>
      <Container size="4">
        <Navigation />
        <Menu></Menu>
      </Container>
    </Box>

  )
}

export default App
