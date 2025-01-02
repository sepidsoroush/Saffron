import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthPage from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import MealsPage from "./pages/Meals";
import ShoppingListPage from "./pages/ShoppingList";
import PlanPage from "./pages/Plan";
import OnboardingPage from "./pages/Onboarding";
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
        path: "onboarding",
        element: <ProtectedRoute element={<OnboardingPage />} />,
      },
      {
        path: "plan",
        element: <ProtectedRoute element={<PlanPage />} />,
      },

      {
        path: "meals",
        element: <ProtectedRoute element={<MealsPage />} />,
      },
      {
        path: "shoppinglist",
        element: <ProtectedRoute element={<ShoppingListPage />} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
