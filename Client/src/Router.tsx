import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { LoginProvider } from "./context/LoginContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Admin from "./pages/Admin.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </AuthProvider>
    ),
  },

  {
    path: "/admin",
    element: (
      <AuthProvider>
        <LoginProvider>
          <Admin></Admin>
        </LoginProvider>
      </AuthProvider>
    ),
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
