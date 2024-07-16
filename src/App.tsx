import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import NewMealPage from "./pages/meals/NewMeal";
import EditMealPage from "./pages/meals/EditMeal";
import MealsPage from "./pages/meals/Meals";
import IngredientsPage from "./pages/ingredients/Ingredients";
import SchedulePage from "./pages/schedule/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SchedulePage /> },
      {
        path: "/meals",
        children: [
          { index: true, element: <MealsPage /> },
          {
            path: "/meals/new",
            element: <NewMealPage />,
          },
          {
            path: "/meals/:mealId",
            element: <EditMealPage />,
          },
        ],
      },
      {
        path: "/ingredients",
        element: <IngredientsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
