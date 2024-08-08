import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "@/config/supabaseConfig";

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/schedule");
    }
  }, [user, navigate]);

  return (
    <div className="relative grid h-[calc(100vh-3rem)] grid-cols-1 overflow-hidden">
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />

        <div className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:col-span-2 md:flex md:translate-y-0 lg:col-span-1 justify-center my-10">
          <div className="w-4/5 md:w-1/2 lg:w-1/3">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google", "github"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
