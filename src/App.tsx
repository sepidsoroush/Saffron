import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthPage from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import MealsPage from "./pages/meals/Meals";
import IngredientsPage from "./pages/ingredients/Ingredients";
import SchedulePage from "./pages/schedule/Schedule";
import OnboardingPage from "./pages/onboarding/Onboarding";
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
        path: "onboarding",
        element: <ProtectedRoute element={<OnboardingPage />} />,
      },
      {
        path: "meals",
        element: <ProtectedRoute element={<MealsPage />} />,
      },
      {
        path: "ingredients",
        element: <ProtectedRoute element={<IngredientsPage />} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
