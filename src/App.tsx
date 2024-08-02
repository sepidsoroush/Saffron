import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Setting from "./pages/Setting";
import NewMealPage from "./pages/meals/NewMeal";
import EditMealPage from "./pages/meals/EditMeal";
import MealsPage from "./pages/meals/Meals";
import MealDetails from "./pages/meals/MealDetails";
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
            element: <MealDetails />,
          },
          {
            path: "/meals/:mealId/edit",
            element: <EditMealPage />,
          },
        ],
      },
      {
        path: "/ingredients",
        element: <IngredientsPage />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
