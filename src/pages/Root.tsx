import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import MobileNavbar from "@/components/layout/mobile-navbar";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { useAppDispatch } from "@/store/hooks";
import { fetchMeals } from "@/store/meals/meals.actions";
import { fetchIngredients } from "@/store/ingredients/ingredients.actions";
import { fetchSchedule } from "@/store/schedule/schedule.actions";
import { fetchCompositions } from "@/store/compositions/compositions.actions";
import { fetchGroceries } from "@/store/groceries/groceries.actions";

import AuthPage from "./Auth";
import supabase from "@/config/supabaseConfig";
import { Session } from "@supabase/supabase-js";

function RootLayout() {
  const dispatch = useAppDispatch();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(fetchMeals());
      dispatch(fetchIngredients());
      dispatch(fetchSchedule());
      dispatch(fetchCompositions());
      dispatch(fetchGroceries());
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

  if (!session) {
    return <AuthPage />;
  }

  return (
    <React.Fragment>
      <div className="flex">
        <aside className="md:w-[220px] fixed h-full border-r bg-background/60 backdrop-blur-xl transition-all">
          <Navbar />
        </aside>
        <main className="w-full md:ml-[220px] md:mb-0 flex-1 overflow-auto">
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
