import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import MobileNavbar from "@/components/layout/mobile-navbar";
import ScrollToTop from "@/components/layout/scroll-top";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { useAppDispatch } from "@/store/hooks";
import { fetchMeals } from "@/store/meals/meals.actions";
import { fetchIngredients } from "@/store/ingredients/ingredients.actions";
import { fetchSchedule } from "@/store/schedule/schedule.actions";
import { fetchCompositions } from "@/store/compositions/compositions.actions";

import { useAuth } from "@/hooks/useAuth";

function RootLayout() {
  const dispatch = useAppDispatch();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (session) {
      dispatch(fetchMeals());
      dispatch(fetchIngredients());
      dispatch(fetchSchedule());
      dispatch(fetchCompositions());
    }
  }, [dispatch, session]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center place-content-center">
        <LoadingSpinner
          width={48}
          height={48}
          className="flex items-center place-content-center"
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ScrollToTop />

      <div className="flex">
        <aside className="md:w-[220px] hidden md:block fixed h-full border-r">
          <Navbar />
        </aside>
        <main className="w-full md:ml-[220px] md:mb-0 px-[22px] mb-[72px] overflow-auto">
          <Outlet />
        </main>
        <div className="fixed -bottom-0.5 md:hidden bg-white w-full z-30 flex justify-center items-center">
          <MobileNavbar />
        </div>
        <Toaster />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
