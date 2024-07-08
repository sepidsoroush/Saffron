import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import MealsPage from "./pages/Meals";
import PantryPage from "./pages/Pantry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <MealsPage /> }],
  },
  {
    path: "/pantry",
    element: <PantryPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
