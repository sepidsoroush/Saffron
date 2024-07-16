import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import NewMealPage from "./pages/meals/NewMeal";
import EditMealPage from "./pages/meals/EditMeal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/meals/new",
    element: <NewMealPage />,
  },
  {
    path: "/meals/:mealId",
    children: [
      { index: true, element: <EditMealPage /> },
      {
        path: "/meals/:mealId/edit",
        element: <EditMealPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
