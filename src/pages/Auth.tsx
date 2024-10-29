import { useState } from "react";
import supabase from "@/config/supabaseConfig";

const AuthPage = () => {
  const [error, setError] = useState<string | null>(null);

  // Social Sign-in
  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="auth-container">
      <button onClick={() => handleOAuthSignIn("google")}>Google</button>
      <button onClick={() => handleOAuthSignIn("facebook")}>Facebook</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AuthPage;
