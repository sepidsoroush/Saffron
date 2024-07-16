import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/shared/header";

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
        <div className="flex flex-1">
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
