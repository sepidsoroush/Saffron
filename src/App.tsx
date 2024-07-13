import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import NewMealPage from "./pages/NewMeal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/new-meal",
    element: <NewMealPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
