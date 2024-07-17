import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/shared/header";
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
      <div className="flex flex-col">
        <Header />
        <main className="w-full px-2">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
