import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import MarketingPage from "./Marketing";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};
const useAuthenticationCheck = () => {
  const { user, loading } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  return { user, isAuthChecked };
};

const RedirectToSchedule = ({ user }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/plan");
    }
  }, [user, navigate]);

  return null;
};

const LoadingScreen = () => (
  <div className="w-full h-screen flex items-center place-content-center">
    <LoadingSpinner
      width={48}
      height={48}
      className="flex items-center place-content-center"
    />
  </div>
);

const RedirectToProperPage = () => {
  const { user, isAuthChecked } = useAuthenticationCheck();

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <MarketingPage />;
  }

  return <RedirectToSchedule user={user} />;
};

export default RedirectToProperPage;
