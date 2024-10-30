import { useState } from "react";
import supabase from "@/config/supabaseConfig";
import CloudinaryImage from "@/components/shared/cloudinary-image";

import { Avocado, Cherries, Bread } from "@phosphor-icons/react";

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
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden bg-gradient-to-t from-orange-50 to-white px-8 md:px-0 gap-36">
      <div className="relative h-52 max-w-[320px] w-full">
        <div className="absolute overflow-hidden w-[108px] h-[142px] top-0 left-4 rotate-6 shadow-combined border-[6px] border-white rounded-2xl">
          <CloudinaryImage
            imageNameOrUrl="app/jnnolhpitynbvgdxiizm"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[129px] h-[157px] bottom-0 left-24 bg-cover shadow-combined border-[6px] border-white rounded-2xl z-10">
          <CloudinaryImage
            imageNameOrUrl="app/urswbl6jcraksqdit5v8"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[108px] h-[108px] top-5 right-4 bg-cover -rotate-6 shadow-combined border-[6px] border-white rounded-2xl">
          <CloudinaryImage
            imageNameOrUrl="app/lkdfldikmnekm341rove"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="p-3 rounded-full bg-green-200 shadow-icon rotate-[27deg] absolute top-0 right-0 z-10">
          <Avocado size={27} color="#16A34A" weight="fill" />
        </div>
        <div className="p-4 rounded-full bg-orange-200 shadow-icon absolute bottom-8 left-0 z-10">
          <Bread size={32} color="#B45309" weight="fill" />
        </div>
        <div className="p-2 rounded-full bg-rose-200 shadow-icon absolute bottom-4 right-12 z-10">
          <Cherries size={20} color="#DB2777" weight="fill" />
        </div>
      </div>
      <div>
        <div className="mb-10 text-neutral-800 text-center text-xl leading-7 font-medium ">
          Plan meals, explore recipes, and savor flavors all week!
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-full px-5 py-3 bg-white shadow-combined rounded-2xl overflow-hidden inline-flex justify-center items-center gap-1 max-w-[320px]">
            <div className="relative">
              <img src="/google.svg" />
            </div>
            <button
              onClick={() => handleOAuthSignIn("google")}
              className="text-black text-[17px] font-[600] leading-[22px] break-words"
            >
              Sign in with Google
            </button>
          </div>
          <div className="w-full px-5 py-3 bg-white shadow-combined rounded-2xl overflow-hidden inline-flex justify-center items-center gap-1 max-w-[320px]">
            <div className="relative">
              <img src="/facebook.svg" />
            </div>
            <button
              onClick={() => handleOAuthSignIn("facebook")}
              className="text-black text-[17px] font-[600] leading-[22px] break-words"
            >
              Sign in with Facebook
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
