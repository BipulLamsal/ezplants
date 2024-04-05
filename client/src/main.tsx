import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import "./index.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      accentColor="teal"
      grayColor="sand"
      radius="large"
      scaling="95%"
      panelBackground="translucent"
      // appearance="dark"
    >
      <App />
      {/* <ThemePanel></ThemePanel>  */}
    </Theme>
  </React.StrictMode>
);
