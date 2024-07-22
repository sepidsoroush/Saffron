import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import MobileNavbar from "@/components/layout/mobile-navbar";
import { Toaster } from "@/components/ui/toaster";

import { useAppDispatch } from "@/store/hooks";
import { fetchMeals } from "@/store/actions/meals-actions";
import { fetchIngredients } from "@/store/actions/ingredients-actions";
import { fetchSchedule } from "@/store/actions/schedule-actions";
import { fetchCompositions } from "@/store/actions/compositions-actions";

function RootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchIngredients());
    dispatch(fetchSchedule());
    dispatch(fetchCompositions());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside className="sticky top-0 md:w-[220px] border-r bg-background/60 backdrop-blur-xl transition-all px-2">
          <Navbar />
        </aside>
        <main className="w-full px-2">
          <Outlet />
        </main>
        <div className="fixed bottom-0 md:hidden bg-background/60 backdrop-blur-xl transition-all w-full">
          <MobileNavbar />
        </div>
        <Toaster />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
