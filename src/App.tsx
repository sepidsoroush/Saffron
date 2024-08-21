import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthPage from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Setting from "./pages/Setting";
import NewMealPage from "./pages/meals/NewMeal";
import EditMealPage from "./pages/meals/EditMeal";
import MealsPage from "./pages/meals/Meals";
import MealDetails from "./pages/meals/MealDetails";
import IngredientsPage from "./pages/ingredients/Ingredients";
import SchedulePage from "./pages/schedule/Schedule";
import RedirectToProperPage from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToProperPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "schedule",
        element: <ProtectedRoute element={<SchedulePage />} />,
      },
      {
        path: "meals",
        children: [
          { index: true, element: <ProtectedRoute element={<MealsPage />} /> },
          {
            path: "new",
            element: <ProtectedRoute element={<NewMealPage />} />,
          },
          {
            path: ":mealId",
            element: <ProtectedRoute element={<MealDetails />} />,
          },
          {
            path: ":mealId/edit",
            element: <ProtectedRoute element={<EditMealPage />} />,
          },
        ],
      },
      {
        path: "ingredients",
        element: <ProtectedRoute element={<IngredientsPage />} />,
      },
      {
        path: "setting",
        element: <ProtectedRoute element={<Setting />} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
