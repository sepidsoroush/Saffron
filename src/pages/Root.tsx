import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import MobileNavbar from "@/components/layout/mobile-navbar";
import { Toaster } from "@/components/ui/toaster";

import { useAppDispatch } from "@/store/hooks";
import { fetchMeals } from "@/store/meals/meals.actions";
import { fetchIngredients } from "@/store/ingredients/ingredients.actions";
import { fetchSchedule } from "@/store/schedule/schedule.actions";
import { fetchCompositions } from "@/store/compositions/compositions.actions";
import { fetchGroceries } from "@/store/groceries/groceries.actions";

function RootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchIngredients());
    dispatch(fetchSchedule());
    dispatch(fetchCompositions());
    dispatch(fetchGroceries());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="flex">
        <aside className="md:w-[220px] fixed h-full border-r bg-background/60 backdrop-blur-xl transition-all">
          <Navbar />
        </aside>
        <main className="w-full md:ml-[220px] my-[72px] md:mb-0 flex-1 overflow-auto">
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
