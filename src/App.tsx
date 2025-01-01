import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthPage from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Setting from "./pages/setting/Setting";
import EditMealPage from "./pages/meals/EditMeal";
import MealsPage from "./pages/meals/Meals";
import IngredientsPage from "./pages/ingredients/Ingredients";
import SchedulePage from "./pages/schedule/Schedule";
import OnboardingPage from "./pages/onboarding/Onboarding";
import RedirectToProperPage from "./pages/Redirect";
import Notifications from "./pages/setting/Notifications";
import Reminders from "./pages/setting/Reminders";

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
        path: "onboarding",
        element: <ProtectedRoute element={<OnboardingPage />} />,
      },
      {
        path: "meals",
        children: [
          { index: true, element: <ProtectedRoute element={<MealsPage />} /> },

          {
            path: ":mealName/edit",
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
        children: [
          { index: true, element: <ProtectedRoute element={<Setting />} /> },
          {
            path: "notifications",
            children: [
              {
                index: true,
                element: <ProtectedRoute element={<Notifications />} />,
              },
              {
                path: "reminders",
                element: <ProtectedRoute element={<Reminders />} />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
